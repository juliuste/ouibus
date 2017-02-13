'use strict'

const h = require('./helpers')
const moment = require('moment-timezone')

const parseLeg = (l) => ({
	from: l.origin_id + '',
	to: l.destination_id + '',
	departure: new Date(l.departure),
	arrival: new Date(l.arrival),
	busNumber: l.bus_number
})

const parseRoute = (r) => ({
	id: r.id,
	from: r.origin_id + '',
	to: r.destination_id + '',
	departure: new Date(r.departure),
	arrival: new Date(r.arrival),
	price: {
		normal: {
			value: r.price_cents / 100,
			currency: r.price_currency
		},
		promo: r.is_promo ? {
			value: r.price_promo_cents / 100,
			currency: r.price_promo_currency
		} : null
	},
	available: r.available,
	// todo: passengers
	parts: r.legs.map(parseLeg)
})

const routes = (from, to, date, opt) => {
	const settings = Object.assign({
		currency: 'EUR',
		transfers: 1,
		passengers: [{
			id: 1,
			age: 30
		}],
		locale: 'en'
	}, opt || {}, {
		origin_id: from,
		destination_id: to,
		date: moment.tz(date, 'Europe/Paris').format('YYYY-MM-DD')
	})
	return h.post('https://api.idbus.com/v3/search', settings).catch(() => {trips: []})
	.then((r) => (r.trips || []).map(parseRoute))
}

module.exports = routes