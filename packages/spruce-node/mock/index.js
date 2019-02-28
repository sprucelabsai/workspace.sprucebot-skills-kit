const url = require('../utilities/url')
var debug = require('debug')('@sprucelabs/spruce-node')
const { buildClientSchema } = require('graphql')
const fs = require('fs')
const { mockServer } = require('graphql-tools')

module.exports = class MockHttps {
	constructor({
		host,
		apiKey,
		id,
		version,
		allowSelfSignedCerts = false,
		customMocks
	}) {
		if (!host || !apiKey || !id || !version) {
			throw new Error(
				'You gotta pass host, apiKey, id, and version to the Http constructor.'
			)
		}
		this.host = host
		this.apiKey = apiKey
		this.id = id
		this.version = version
		this.allowSelfSignedCerts = allowSelfSignedCerts

		// this.createServer({ customMocks })
	}

	async mockApiGQLServerInit({ customMocks }) {
		const introspectionSchemaResult = JSON.parse(
			fs.readFileSync(`${__dirname}/apiSchema.json`)
		)
		const schema = buildClientSchema(introspectionSchemaResult.data)
		this.mockServer = mockServer(schema, customMocks)
	}

	async query(query) {
		const result = await this.mockServer.query(query)
		return result
	}

	async mutation(query) {
		const result = await this.mockServer.query(query)
		return result
	}

	/**
	 * GET an endpoint.
	 *
	 * @param {String} url Path to the endpoint you want to hit. Do NOT include /api/${version}/skills/${id}
	 * @param {Object} query Vanilla object that is converted into a query string
	 * @returns {Promise}
	 */
	async get(path, query) {
		return Promise.resolve({})
	}

	/**
	 * POST some data to the API. Override `method` to PATCH for patching.
	 *
	 * @param {String} path
	 * @param {Object} data
	 * @param {Object} query
	 * @param {String} method
	 * @returns {Promise}
	 */
	async post(path, data, query, method = 'POST') {
		return Promise.resolve({})
	}

	/**
	 * Make an update through the API
	 *
	 * @param {String} path
	 * @param {Object} data
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async patch(path, data, query) {
		// return this.post(path, data, query, 'PATCH')
		return Promise.resolve({})
	}

	/**
	 * Delete something from the API
	 * @param {String} path
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async delete(path, query) {
		return Promise.resolve({})
	}

	/**
	 * Univeral handling of all responses from the API
	 *
	 * @param {Request} request
	 * @param {Response} response
	 * @param {Function} resolve
	 * @param {Function} reject
	 */
	handleResponse(request, response, resolve, reject) {
		// Build response as data comes in
		let body = ''
		response.on('data', d => (body += d))

		request.on('error', err => {
			debug(`REQUEST ERROR: ${request.method} ${request.path}`, err)
			reject(err)
		})

		// Handle errors
		response.on('error', err => {
			debug(`RESPONSE ERROR: ${request.method} ${request.path}`, err)
			reject(err)
		})

		// Handle completion
		response.on('end', () => {
			try {
				var parsed = JSON.parse(body)
				if (response.statusCode !== 200) {
					const error = new Error(
						parsed.friendlyReason || parsed.reason || JSON.stringify(parsed)
					)
					error.request = request
					error.response = response
					error.response.body = body
					error.response.json = parsed
					reject(error)
				} else {
					resolve(parsed)
				}
			} catch (err) {
				debug(`RESPONSE ERROR: ${request.method} ${request.path}`, err)
				reject(err)
			}
		})
	}
}
