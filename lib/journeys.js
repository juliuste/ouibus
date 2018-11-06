'use strict'

const h = require('./helpers')
const moment = require('moment-timezone')

const parseLeg = (l) => ({
	origin: l.origin_id + '',
	destination: l.destination_id + '',
	departure: new Date(l.departure),
	arrival: new Date(l.arrival),
	busNumber: l.bus_number
})

const parseJourney = (r) => {
	const journey = {
		type: 'journey',
		id: r.id,
		origin: r.origin_id + '',
		destination: r.destination_id + '',
		departure: new Date(r.departure),
		arrival: new Date(r.arrival),
		price: {
			amount: (r.price_promo_cents ? Math.min(r.price_cents / 100, r.price_promo_cents / 100) : r.price_cents / 100),
			currency: 'EUR',
			fares: [
				{
					price: {
						amount: r.price_cents / 100,
						currency: 'EUR'
					},
					model: 'normal'
				}
			]
		},
		available: r.available,
		// todo: passengers
		legs: r.legs.map(parseLeg)
	}
	if (r.price_promo_cents) {
		journey.price.fares.push({
			price: {
				amount: r.price_promo_cents / 100,
				currency: 'EUR'
			},
			model: 'promo'
		})
	}
	return journey
}

const journeys = (origin, destination, date, opt) => {
	const settings = Object.assign({
		currency: 'EUR',
		transfers: 1,
		passengers: [{
			id: 1,
			age: 30
		}],
		locale: 'en'
	}, opt || {}, {
		origin_id: origin,
		destination_id: destination,
		date: moment.tz(date, 'Europe/Paris').format('YYYY-MM-DD')
	})
	return h.post('https://api.idbus.com/v3/search', settings).catch(() => ({ trips: [] }))
		.then((r) => (r.trips || []).map(parseJourney))
}

module.exports = journeys
