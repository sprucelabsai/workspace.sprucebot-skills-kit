import { extend, pick } from 'lodash'

interface ISerializeErrorResponse {
	message?: string
	arguments?: any[]
	type?: string
	name?: string
	stack?: string[]
	data?: any
}

class SpruceWebError extends Error {
	public data: any

	public constructor(message: string = '', data: any) {
		super()
		this.name = 'SpruceWebError'
		this.message = `${this.name} :: ${message}`
		this.data = data
		this.stack = new Error().stack
	}
}

const options = {
	logFunction: console.log,
	logStyle: 'string'
}

function logData(data: any): void {
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

function serializeError(error: Error): ISerializeErrorResponse {
	const dataForSerialization = pick(error, [
		'message',
		'arguments',
		'type',
		'name',
		'stack',
		'data'
	])

	const responseData: ISerializeErrorResponse = {
		...dataForSerialization,
		stack:
			typeof dataForSerialization.stack === 'string'
				? dataForSerialization.stack.split('\n')
				: []
	}

	return responseData
}

function trackError(
	errorObject: Error | SpruceWebError,
	additionalData: Record<string, any> = {}
): void {
	logData(extend({}, serializeError(errorObject), additionalData))
}

interface IConfigure {
	logFunction: (message?: any, ...optionalParams: any[]) => void
	logStyle: string
}

function configure({ logFunction, logStyle }: IConfigure): void {
	options.logFunction = logFunction
	options.logStyle = logStyle
}

export { SpruceWebError, trackError, configure }
