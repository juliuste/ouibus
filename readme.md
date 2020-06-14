# ouibus

**WARNING: THIS PACKAGE IS UNMAINTAINED AND PROBABLY WON'T FUNCTION CORRECTLY ANYMORE.**

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
[
	{
		"address": "1 Avenue Louis le Débonnaire 57000 Metz",
		"destinations": [
			"415",
			"416"
			// …
		],
		"id": "47",
		"location": {
			"latitude": 49.110633,
			"longitude": 6.183319,
			"timezone": "Europe/Paris",
			"type": "location"
		},
		"name": "Metz",
		"timezone": "Europe/Paris",
		"type": "station"
	}
	// …
]
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
[
	{
		"available": true,
		"id": "30702067",
		"legs": [
			{
				"arrival": "2018-11-10T09:40:00+01:00",
				"departure": "2018-11-09T19:10:00+01:00",
				"destination": "5",
				"line": {
					"id": "5751",
					"mode": "bus",
					"name": "5751",
					"public": true,
					"type": "line"
				},
				"mode": "bus",
				"operator": "ouibus",
				"origin": "1",
				"public": true
			},
			{
				"arrival": "2018-11-10T16:35:00+01:00",
				"departure": "2018-11-10T11:10:00+01:00",
				"destination": "13",
				"line": {
					"id": "5868",
					"mode": "bus",
					"name": "5868",
					"public": true,
					"type": "line"
				},
				"mode": "bus",
				"operator": "ouibus",
				"origin": "5",
				"public": true
			}
		],
		"price": {
			"amount": 62,
			"currency": "EUR",
			"fares": [
				{
					"model": "normal",
					"price": {
						"amount": 62,
						"currency": "EUR"
					}
				}
			]
		},
		"type": "journey"
	}
	// …
]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/ouibus/issues).
