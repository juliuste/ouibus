'use strict'

const h = require('./helpers')
const moment = require('moment-timezone')

const parseLeg = (l) => ({
	origin: l.origin_id + '',
	destination: l.destination_id + '',
	departure: moment(l.departure).format(), // todo: timezone
	arrival: moment(l.arrival).format(), // todo: timezone
	line: {
		type: 'line',
		id: l.bus_number + '',
		name: l.bus_number + '',
		mode: 'bus',
		public: true
	},
	mode: 'bus',
	public: true,
	operator: 'ouibus' // todo
})

const parseJourney = (r) => {
	const journey = {
		type: 'journey',
		id: r.id + '',
		legs: r.legs.map(parseLeg),
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
		available: r.available
		// todo: passengers
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
