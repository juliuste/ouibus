# ouibus

JavaScript client for the [OUIBUS](http://www.ouibus.com/) (formerly known as idBUS) API. Inofficial, using endpoints by *OUIBUS*. Ask them for permission before using this module in production.

[![npm version](https://img.shields.io/npm/v/ouibus.svg)](https://www.npmjs.com/package/ouibus)
[![Build Status](https://travis-ci.org/juliuste/ouibus.svg?branch=master)](https://travis-ci.org/juliuste/ouibus)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/ouibus.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/ouibus.svg)](https://david-dm.org/juliuste/ouibus)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/ouibus.svg)](https://david-dm.org/juliuste/ouibus#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/ouibus.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```sh
npm install ouibus
```

## Usage

```js
const ouibus = require('ouibus')
```

The `ouibus` module bundles two methods: `stations()` and `routes()`.

### stations()

Ouibus network. Returns a `Promise` that resolves in a list of all stations:

```js
ouibus.stations().then(…)
```

would give you

```js
[{
	"id": "3",
	"name": "Gérone",
	"timezone": "Europe/Madrid",
	"address": "Plaça Espanya 2 17002 Girona",
	"position": {
		"longitude": "2.817476",
		"latitude": "41.97901"
	},
	"destinations": [16,29,134,35,103,112,146,116,118,149,150],
	"stops": […] // only contained by meta-stations (like "Paris - Tous les arrêts"), list of subordinate stops)
}, …]

```

### routes(fromID, toID, date, opt)

Find routes for a given date (always returns results for the entire day). Returns a `Promise` that resolves in a list of matching routes.

```js
ouibus.routes(fromID, toID, date, opt).then(…)
ouibus.routes(
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
	"id": "2399345",
	"from": "1",
	"to": "13",
	"departure": "2017-02-14T21:30:00.000Z", // Date() object
	"arrival": "2017-02-15T14:45:00.000Z", // Date() object
	"price": {
		"normal": {"value":44, "currency": "EUR"},
		"promo": null // would look like 'normal' if there was a promotion
	},
	"available": true,
	"parts": [{
		"from": "1",
		"to": "29",
		"departure": "2017-02-14T21:30:00.000Z", // Date() object
		"arrival": "2017-02-15T05:30:00.000Z", // Date() object
		"busNumber": "5041"
	}, …]}
, …]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/ouibus/issues).
