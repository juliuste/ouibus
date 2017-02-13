'use strict'

const tape = require('tape')
const ouibus = require('./index')

tape('ouibus.stations', (t) => {
	ouibus.stations().then((stations) => {
		t.plan(4)
		t.false(stations.length == 0, 'stations count')
		t.true(stations[0].id, 'station id')
		t.true(stations[0].name, 'station name')
		t.true(stations[0].destinations, 'station destinations')
	})
})

tape('ouibus.stations', (t) => {
	ouibus.routes(90, 13, new Date(+new Date()+1000*60*60*24)).then((routes) => {
		t.plan(13)
		t.true(routes.length, 'routes count')
		t.true(routes[0].id, 'route id')
		t.true(routes[0].from, 'route from')
		t.true(routes[0].to, 'route to')
		t.true(+routes[0].departure, 'route departure')
		t.true(+routes[0].arrival, 'route arrival')
		t.true(routes[0].price.normal.value, 'route price')
		t.true(routes[0].parts.length, 'parts count')
		t.true(routes[0].parts[0].from, 'part from')
		t.true(routes[0].parts[0].to, 'part to')
		t.true(+routes[0].parts[0].departure, 'part departure')
		t.true(+routes[0].parts[0].arrival, 'part arrival')
		t.true(routes[0].parts[0].busNumber, 'part bus number')
	})
})