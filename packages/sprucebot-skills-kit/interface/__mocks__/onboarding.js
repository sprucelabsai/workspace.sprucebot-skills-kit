import path from 'path'

import client from './client'

function respondWithStub(file) {
	const contents = require(file)
	if (contents.default) {
		return contents.default
	}

	return contents
}

export function didOnboarding(
	status = 200,
	file = path.resolve(__dirname, './stubs/onboarding.js')
) {
	return client()
		.get(`/api/1.0/guest/onboarding.json`)
		.reply(status, respondWithStub(file))
}
