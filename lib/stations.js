'use strict'

const h = require('./helpers')

const parseStation = (s) => {
	const result = {}
	result.type = 'station'
	result.id = s.id + ''
	result.name = s.long_name
	result.timezone = s.time_zone
	if (s.address) result.address = s.address
	if (s.longitude && s.latitude) {
		result.coordinates = {
			longitude: s.longitude,
			latitude: s.latitude
		}
	}
	if (s.stops && s.stops.length) result.stops = s.stops.map(parseStation)
	result.destinations = s.destinations_ids
	return result
}

const stations = () =>
	h.get('https://api.idbus.com/v2/stops')
		.then((res) => (res.stops || []).map(parseStation))

module.exports = stations
