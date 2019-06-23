import path from 'path'

import client from './client'

export const JWT = '__mock_jwt__'

function respondWithStub(file) {
	const contents = require(file)
	if (contents.default) {
		return contents.default
	}

	return contents
}

export function auth(
	status = 200,
	file = path.resolve(__dirname, './stubs/me.js')
) {
	return client()
		.get(`/api/1.0/auth/${JWT}.json`)
		.reply(status, respondWithStub(file))
}

export function guests(
	status = 200,
	file = path.resolve(__dirname, './stubs/userList.js')
) {
	return client()
		.get(`/api/1.0/teammate/guests.json`)
		.reply(status, respondWithStub(file))
}

export function teammates(
	status = 200,
	file = path.resolve(__dirname, './stubs/userList.js')
) {
	return client()
		.get(`/api/1.0/teammate/teammates.json`)
		.reply(status, respondWithStub(file))
}
