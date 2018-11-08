'use strict'

const tapeWithoutPromise = require('tape')
const addPromiseSupport = require('tape-promise').default
const tape = addPromiseSupport(tapeWithoutPromise)
const validate = require('validate-fptf')()
const ouibus = require('.')

tape('ouibus.stations', async (t) => {
	const stations = await ouibus.stations()
	t.ok(stations.length > 50, 'stations count')
	for (let station of stations) {
		t.doesNotThrow(() => validate(station), 'station valid')
		t.ok(Array.isArray(station.destinations), 'station destinations')
		for (let destination of station.destinations) {
			t.doesNotThrow(() => validate(destination), 'station destination valid')
		}
	}
	t.end()
})

tape('ouibus.journeys', async (t) => {
	const journeys = await ouibus.journeys(90, 13, new Date(+new Date() + 1000 * 60 * 60 * 24))
	t.ok(journeys.length > 1, 'journeys count')
	for (let journey of journeys) {
		t.doesNotThrow(() => validate(journey), 'journey valid')
		for (let leg of journey.legs) {
			t.doesNotThrow(() => validate(leg.line), 'leg line')
		}
		t.ok(journey.price, 'journey price')
	}
	t.end()
})
