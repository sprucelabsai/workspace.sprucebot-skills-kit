const errors = require('../../config/errors')

module.exports.eventError = async function eventError({ ctx, next, e }) {
	log.debug(e)
	const code = e.message
	const body = {
		status: 'failure'
	}
	let status = 500

	if (errors[code]) {
		status = errors[code].code
		body.error = {
			name: code,
			code: errors[code].code,
			reason: errors[code].reason,
			friendlyReason: errors[code].friendlyReason
		}
	} else {
		body.error = {
			name: 'UNKNOWN',
			code: errors.UNKNOWN.code,
			reason: errors.UNKNOWN.reason,
			friendlyReason: errors.UNKNOWN.friendlyReason
		}
	}

	ctx.status = status
	ctx.body = body

	await next()
}
