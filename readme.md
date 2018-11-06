# ouibus

JavaScript client for the [OUIBUS](http://www.ouibus.com/) (formerly known as idBUS) API. Inofficial, using endpoints by *OUIBUS*. Ask them for permission before using this module in production.

[![npm version](https://img.shields.io/npm/v/ouibus.svg)](https://www.npmjs.com/package/ouibus)
[![Build Status](https://travis-ci.org/juliuste/ouibus.svg?branch=master)](https://travis-ci.org/juliuste/ouibus)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/ouibus.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/ouibus.svg)](https://david-dm.org/juliuste/ouibus)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/ouibus.svg)](https://david-dm.org/juliuste/ouibus#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/ouibus.svg?style=flat)](license)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```sh
npm install ouibus
```

## Usage

```js
const ouibus = require('ouibus')
```

The `ouibus` module bundles two methods: `stations()` and `journeys()`.

### stations()

Ouibus network. Returns a `Promise` that resolves in a list of all stations:

```js
ouibus.stations().then(…)
```

would give you

```js
[{
	"type": "station",
	"id": "3",
	"name": "Gérone",
	"timezone": "Europe/Madrid",
	"address": "Plaça Espanya 2 17002 Girona",
	"coordinates": { "longitude": "2.817476", "latitude": "41.97901" },
	"destinations": [112,146,149,128,29,134,301,302,18,137,303,15,300,34,118,95,116,76,21,136,103,41,299,16,35,306,307,14,13,309],
	"stops": […] // only contained by meta-stations (like "Paris - Tous les arrêts"), list of subordinate stops)
}, …]

```

### journeys(originID, destinationID, date, opt)

Find journeys for a given date (always returns results for the entire day). Returns a `Promise` that resolves in a list of matching journeys.

```js
ouibus.journeys(originID, destinationID, date, opt).then(…)
ouibus.journeys(
	90, // Paris
	13, // Montpellier
	new Date(),
	// default options
	{
		transfers: 1, // max. transfers
		currency: 'EUR', // TODO: supported currencies
		passengers: [{
			id: 1, // TODO
			age: 30
		}]
	}
).then(…)
```

would give you

```js
[{
	"type": "journey",
	"id": "5133615",
	"origin": "51",
	"destination": "13",
	"departure": "2017-07-19T19:00:00.000Z", // Date() object
	"arrival": "2017-07-20T13:40:00.000Z", // Date() object
	"price": {
		"amount": 42,
		"currency": "EUR",
		"fares": [
			{
				"price": {
					"amount": 42,
					"currency": "EUR"
				},
				"model": "normal"
			},
			// Here would be another entry which looks like
			// the one above if there was a promotion.
		]
	},
	"available": true,
	"legs": [{
		"origin": "51",
		"destination": "15",
		"departure": "2017-07-19T19:00:00.000Z", // Date() object
		"arrival": "2017-07-20T06:35:00.000Z", // Date() object
		"busNumber": "5703"
	}, …]}
, …]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/ouibus/issues).
