const { extend, pick } = require('lodash')

function SpruceWebError(message = '', data) {
	this.name = 'SpruceWebError'
	this.message = `${this.name} :: ${message}`
	this.data = data
	this.stack = new Error().stack
}

SpruceWebError.prototype = new Error()

const options = {
	logFunction: console.log,
	logStyle: 'string'
}

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

			if (options.logStyle === 'string') {
				options.logFunction(JSON.stringify(result))
			} else {
				options.logFunction(result)
			}
		} catch (e) {
			// Don't need to do anthing.
		}
	} else {
		extend(result, { realm: 'server' }, data)

		if (options.logStyle === 'string') {
			options.logFunction(JSON.stringify(result))
		} else {
			options.logFunction(result)
		}
	}
}

function serializeError(error) {
	const dataForSerialization = pick(error, [
		'message',
		'arguments',
		'type',
		'name',
		'stack',
		'data'
	])

	// Split on newlines for prettier logs
	dataForSerialization.stack =
		typeof dataForSerialization.stack === 'string' &&
		dataForSerialization.stack.split('\n')

	return dataForSerialization
}

function trackError(errorObject, additionalData = {}) {
	return logData(extend({}, serializeError(errorObject), additionalData))
}

function configure({ logFunction, logStyle }) {
	options.logFunction = logFunction
	options.logStyle = logStyle
}

module.exports = {
	SpruceWebError,
	trackError,
	configure
}
