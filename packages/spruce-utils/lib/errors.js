const { extend, pick } = require('lodash')

function SpruceWebError(message = '', data) {
	this.name = 'SpruceWebError'
	this.message = `${this.name} :: ${message}`
	this.data = data
}

SpruceWebError.prototype = new Error()

function logData(data) {
	const result = {
		buildId: process.env.DEPLOYMENT_TAG,
		platform: process.env.PLATFORM,
		errorTime: new Date().toISOString()
	}

	if (typeof document !== 'undefined') {
		try {
			extend(result, { realm: 'browser' }, data)

			if (navigator) {
				extend(result, {
					userAgent: navigator.userAgent
				})
			}

			// TODO: Integrate with Ken's Logging.
			console.log(JSON.stringify(result))
		} catch (e) {
			// Don't need to do anthing.
		}
	} else {
		extend(result, { realm: 'server' }, data)

		// TODO: Integrate with Ken's Logging.
		console.log(JSON.stringify(result))
	}
}

function serializeError(error) {
	return pick(error, ['message', 'arguments', 'type', 'name', 'stack', 'data'])
}

function trackError(errorObject, additionalData = {}) {
	return logData(extend({}, serializeError(errorObject), additionalData))
}

module.exports = {
	SpruceWebError,
	trackError
}
