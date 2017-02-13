'use strict'

const request = require('got')

const token = 'lkyAQryj-IoQK6Xb9VtIPQ'

const post = (url, body) =>
	request.post(url, {
		headers: {
			'Authorization': token ? `Token ${token}` : null,
			'Content-Type': 'application/json'
		},
		json: true,
		body: JSON.stringify(body)
	}).then((res) => res.body)

const get = (url) => 
	request.get(url, {
		headers: {
			'Authorization': token ? `Token ${token}` : null
		},
		json: true
	}).then((res) => res.body)

// const token = () => 
// 	post('https://api.idbus.com/v1/users', {locale: 'en'})
// 	.then((res) => res.user.token)

module.exports = {post, get}