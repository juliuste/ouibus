'use strict'

const h = require('./helpers')

const parseStation = (s) => {
	const station = {
		type: 'station',
		id: s.id + '',
		name: s.long_name,
		timezone: s.time_zone
	}
	if (s.address) station.address = s.address
	if (s.longitude && s.latitude) {
		station.location = {
			type: 'location',
			longitude: +s.longitude,
			latitude: +s.latitude,
			timezone: s.time_zone
		}
	}
	if (s.stops && s.stops.length) station.stops = s.stops.map(parseStation)
	station.destinations = s.destinations_ids.map(x => x + '')

	return station
}

const stations = () =>
	h.get('https://api.idbus.com/v2/stops')
		.then((res) => (res.stops || []).map(parseStation))

module.exports = stations
