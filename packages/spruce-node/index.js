const Https = require('./https')

/**
 * Politely tell someone they didn't define an arg
 * @param {string} name
 */
function required(name) {
	throw new Error(
		`You are missing some params! Make sure you set ${name} properly (maybe .env) 🤷🏼‍`
	)
}

function suggested(name) {
	console.log(
		`⚠️  Missing key in Sprucebot() constructor. Check your server.js and environment variables: ${name}`
	)
}

class Sprucebot {
	constructor({
		apiKey = required('apiKey'),
		id = required('id'),
		host = required('host'),
		name = required('name'),
		description = required('description'),
		interfaceUrl = required('interfaceUrl'),
		serverUrl = required('serverUrl'),
		svgIcon = required('svgIcon'),
		allowSelfSignedCerts = false,
		dbEnabled = false,
		eventContract = suggested('eventContract'),
		version = 'unknown',
		skillsKitVersion = 'unknown',
		cards = suggested('cards'),
		acl = suggested('acl'),
		viewVersion = suggested('viewVersion')
	}) {
		const hostMatches = host.match(/^(https?\:\/\/|)([^\/:?#]+)(?:[\/:?#]|$)/i)
		const cleanedHost =
			hostMatches && hostMatches[2] ? hostMatches[2] : required('host')

		this.name = name || required('name')
		this.description = description || required('description')
		this.icon = svgIcon || required('svgIcon')
		this.webhookUrl = (serverUrl || required('serverUrl')) + '/hook.json'
		this.iframeUrl = interfaceUrl || required('interfaceUrl')
		this.cards = cards || {}
		this.acl = acl || {}
		this.viewVersion = viewVersion || 1
		this.marketingUrl =
			(interfaceUrl || required('interfaceUrl')) + '/marketing'

		this.dbEnabled = dbEnabled
		this.eventContract = eventContract || { events: {} }
		this._mutexes = {}

		this.version = version // skill version
		this.skillsKitVersion = skillsKitVersion // skills kit version
		this.apiVersion = '1.0' // maybe pull from package.json?

		// Setup http(s) class with everything it needs to talk to api
		this.https = new Https({
			host: cleanedHost,
			apiKey,
			id,
			version: this.apiVersion,
			allowSelfSignedCerts
		})

		console.log(
			`🌲 Sprucebot🌲 Skills Kit API ${
				this.version
			}\n\nhost : ${cleanedHost} \nid : ${id} \napiKey : ${apiKey.replace(
				/./g,
				'*'
			)} \nname : ${name}\n---------------------------------`
		)
	}

	/**
	 * Sync the settings saved here with specified host (including name,)
	 */
	async sync() {
		this.validateEventContract(this.eventContract)

		const data = {
			name: this.name,
			description: this.description,
			icon: this.icon,
			webhookUrl: this.webhookUrl,
			iframeUrl: this.iframeUrl,
			marketingUrl: this.marketingUrl,
			publicUrl: this.publicUrl,
			eventContract: this.eventContract,
			version: this.version,
			skillsKitVersion: this.skillsKitVersion,
			cards: this.cards,
			acl: this.acl,
			viewVersion: this.viewVersion
		}
		const results = await this.https.patch('/', data)
		let database = null
		if (this.dbEnabled) {
			database = await this.provisionDatabase()
		}

		return { ...results, database }
	}

	async provisionDatabase() {
		return this.https.get('/database/provision')
	}

	async query(query) {
		return this.https.query(query)
	}

	async mutation(query) {
		return this.https.mutation(query)
	}

	/**
	 * Fetch a user based on their id and location
	 *
	 * @param {String} userId
	 * @param {String} locationId
	 * @param {Object} query Optional query string to be added onto request
	 * @returns {Promise}
	 */
	async user(locationId, userId, query) {
		return this.https.get(`/locations/${locationId}/users/${userId}`, query)
	}

	/**
	 * Get a user without a location. GLOBAL SKILLS ONLY
	 *
	 * @param {String} userId
	 * @param {Object} Optional query string to be added to the request
	 */
	async globalUser(userId, query) {
		return this.https.get(`/ge/users/${userId}`, query)
	}

	/**
	 * Get all locations. GLOBAL SKILLS ONLY
	 *
	 * @param {Object} Optional query string to be added to the request
	 */
	async globalLocations(query) {
		return this.https.get(`/ge/locations`, query)
	}

	/**
	 * Create a user
	 *
	 * @param {Object} values
	 * @returns {Promise}
	 */
	async createUser(values) {
		return this.https.post('/ge/users', values)
	}

	/**
	 * Update a users role
	 *
	 * @param {String} locationId
	 * @param {String} userId
	 * @param {String} role
	 * @returns {Promise}
	 */
	async updateRole(locationId, userId, role) {
		return this.https.patch(
			`/ge/locations/${locationId}/users/${userId}/${role}`
		)
	}

	/**
	 * Search for users who have been to this location
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async users(locationId, { role, status, page, limit, q } = {}) {
		return this.https.get(
			`/locations/${locationId}/users/`,
			Array.from(arguments)[1]
		)
	}
	/**
	 * Search for users who have been to this organization
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async orgUsers(organizationId, { role, status, page, limit, q } = {}) {
		return this.https.get(
			`/organizations/${organizationId}/users/`,
			Array.from(arguments)[1]
		)
	}

	/**
	 * Update for user who have been to this location
	 *
	 * @param {String} id
	 * @param {Object} values
	 * @returns {Promise}
	 */
	async updateUser(id, values) {
		return this.https.patch('/users/' + id, values)
	}

	/**
	 * Get a location by id
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async location(locationId, query) {
		return this.https.get(`/locations/${locationId}`, query)
	}

	/**
	 * Fetch all locations where this skill is installed
	 *
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async locations({ page, limit } = {}) {
		return this.https.get('/locations', Array.from(arguments)[0])
	}

	/**
	 * Send a message to a user.
	 *
	 * @param {String} locationId
	 * @param {String} userId
	 * @param {String} message
	 * @param {Object} data Additional data sent when POST'ing message
	 */
	async message(
		locationId,
		userId,
		message,
		{ linksToWebView, webViewQueryData, payload, sendAtTimestamp } = {},
		query = {}
	) {
		const data = Array.from(arguments)[3] || {}
		data.userId = userId
		data.message = message
		if (data.webViewQueryData) {
			data.webViewQueryData = JSON.stringify(data.webViewQueryData)
		}
		return this.https.post(`/locations/${locationId}/messages`, data, query)
	}

	/**
	 * Deletes a message.
	 *
	 * @param {String} locationId
	 * @param {String} messageId
	 */
	async deleteMessage(locationId, messageId) {
		return this.https.delete(`/locations/${locationId}/messages/${messageId}`)
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async queueMessages(messages) {
		return this.https.post('/ge/messages', { messages })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async deleteMessages(messageIds) {
		return this.https.post('/ge/deleteMessages', { messageIds })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE GLOBAL (are not attached to a location).
	 * This allows Sprucebot to communicate to business owners without them
	 * actually needing any skills enabled. Core usage only.
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async globalMessage(userId, message) {
		return this.https.post('/messages', { userId, message })
	}

	/**
	 * Get a bunch of meta data at once
	 *
	 * @param {Object} query
	 * @param {Boolean} suppressErrors
	 */
	async metas(
		{
			key,
			locationId,
			userId,
			createdAt,
			updatedAt,
			sortBy,
			order,
			limit,
			value,
			roles
		} = {},
		suppressParseErrors = true
	) {
		const query = { ...(Array.from(arguments)[0] || {}) }
		if (query.value) {
			query.value = JSON.stringify(query.value)
		}
		if (query.userId) {
			query.userId = JSON.stringify(query.userId)
		}

		if (query.locationId) {
			query.locationId = JSON.stringify(query.locationId)
		}
		if (query.createdAt) {
			query.createdAt = JSON.stringify(query.createdAt)
		}
		if (query.updatedAt) {
			query.updatedAt = JSON.stringify(query.updatedAt)
		}

		if (query.roles) {
			query.roles = JSON.stringify(query.roles)
		}
		return this.https.get('/data', query)
	}

	/**
	 * Get one meta object back.
	 *
	 * @param {String} key
	 * @param {Object} query
	 * @param {Boolean} suppressParseErrors
	 */
	async meta(
		key,
		{ locationId, userId, value, sortBy, order } = {},
		suppressParseErrors = true
	) {
		const args = Array.from(arguments)
		const query = { ...(args[1] || {}) }
		query.key = key
		query.limit = 1
		const metas = await this.metas(query)
		return metas[0]
	}

	/**
	 * Get skill meta data by id
	 *
	 * @param {String} id
	 */
	async metaById(id, { locationId, userId } = {}) {
		return this.https.get(`/data/${id}`, Array.from(arguments)[1])
	}

	/**
	 * Create a meta data record.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {Object} data
	 */
	async createMeta(key, value, { locationId, userId } = {}) {
		const data = {
			...(Array.from(arguments)[2] || {}),
			key,
			value
		}

		const meta = await this.https.post('/data', data)
		return meta
	}

	/**
	 * Update some meta data by id
	 *
	 * @param {String} id
	 * @param {Object} data
	 */
	async updateMeta(id, { key, value, locationId, userId }) {
		const data = {
			...(Array.from(arguments)[1] || {})
		}

		const meta = await this.https.patch(`/data/${id}`, data)
		return meta
	}

	/**
	 * Fetch some meta. Create it if it does not exist
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {Object} query
	 * @param {Boolean} suppressParseErrors
	 */
	async metaOrCreate(
		key,
		value,
		{ locationId, userId } = {},
		suppressParseErrors = true
	) {
		let meta = await this.meta(
			key,
			Array.from(arguments)[2],
			suppressParseErrors
		)

		// not found, create it
		if (!meta) {
			meta = await this.createMeta(key, value, Array.from(arguments)[2])
		}
		return meta
	}
	/**
	 * Creates a meta if it does not exist, updates it if it does
	 * @param {String} key
	 * @param {*} value
	 * @param {Object} query
	 * @param {Boolean} suppressParseErrors
	 */
	async upsertMeta(
		key,
		value,
		{ locationId, userId } = {},
		suppressParseErrors = true
	) {
		let meta = await this.meta(
			key,
			Array.from(arguments)[2],
			suppressParseErrors
		)

		// not found, create it
		if (!meta) {
			meta = await this.createMeta(key, value, Array.from(arguments)[2])
		} else if (JSON.stringify(meta.value) !== JSON.stringify(value)) {
			//found, but value has changed
			meta = await this.updateMeta(meta.id, { value: value })
		}
		return meta
	}

	/**
	 * Delete meta data by id
	 *
	 * @param {String} id
	 */
	async deleteMeta(id) {
		return this.https.delete(`/data/${id}`)
	}

	/**
	 * Emit a custom event. The response is the response from all skills
	 *
	 * @param {String} name
	 * @param {Object} payload
	 */
	async emit(locationId, eventName, payload = {}, options) {
		return this.https.post(`locations/${locationId}/emit`, {
			eventName,
			payload,
			options
		})
	}

	/**
	 * Emit a custom event to all locations under an organization. The response is the response from all skills
	 *
	 * @param {String} name
	 * @param {Object} payload
	 */
	async emitOrganization(organizationId, eventName, payload = {}, options) {
		return this.https.post(`organizations/${organizationId}/emit`, {
			eventName,
			payload,
			options
		})
	}

	/**
	 * Get metadata
	 *
	 * @param {Object} query
	 */
	async getMetadata(query) {
		const meta = await this.https.get('/metadata', query)
		return meta
	}

	/**
	 * Set metadata
	 *
	 * @param {Object} metadata
	 */
	async setMetadata({ locationId, organizationId, userId, refId, metadata }) {
		if (!metadata || metadata.length < 1) {
			throw new Error('INVALID_METADATA')
		}

		const data = [
			{
				locationId: locationId || null,
				organizationId: organizationId || null,
				userId: userId || null,
				refId: refId || null,
				metadata
			}
		]

		const meta = await this.https.patch('/metadata', data)
		return meta
	}

	/**
	 * Delete metadata
	 *
	 * @param {Object} query
	 */
	async deleteMetadata({ keys, locationId, organizationId, userId, refId }) {
		if (keys && keys.length > 0) {
			const data = keys.map(k => {
				return {
					key: k,
					locationId,
					organizationId,
					userId,
					refId
				}
			})
			await this.https.delete('/metadata', data)
		}
		return
	}

	/**
	 * Create location (Enterprise Skills only)
	 *
	 * @param {String} organizationId
	 * @param {Array} locations
	 */
	async eCreateLocations({ organizationId, locations }) {
		const result = await this.https.post(
			`/e/organizations/${organizationId}/locations`,
			{ locations }
		)
		return result
	}

	/**
	 * Create location (Global Skills only)
	 *
	 * @param {Array} locations
	 */
	async gCreateLocations({ locations }) {
		const result = await this.https.post('/g/locations', { locations })
		return result
	}

	/**
	 * Emit any event as an Enterprise skill.
	 *
	 * @param {Object} response
	 */
	async eEmitEvent({ userId, locationId, eventName, payload }) {
		const result = await this.https.post(
			`/e/locations/${locationId}/users/${userId}/emit`,
			{
				eventName,
				payload
			}
		)

		return result
	}

	/**
	 * To stop race conditions, you can have requests wait before starting the next.
	 *
	 * @param {String} key
	 */
	async wait(key) {
		if (!this._mutexes[key]) {
			this._mutexes[key] = {
				promises: [],
				resolvers: [],
				count: 0
			}
		}

		//track which we are on
		this._mutexes[key].count++

		//first is always auto resolved
		if (this._mutexes[key].count === 1) {
			this._mutexes[key].promises.push(new Promise(resolve => resolve()))
			this._mutexes[key].resolvers.push(() => {})
		} else {
			let resolver = resolve => {
				this._mutexes[key].resolvers.push(resolve)
			}
			let promise = new Promise(resolver)
			this._mutexes[key].promises.push(promise)
		}

		return this._mutexes[key].promises[this._mutexes[key].count - 1]
	}

	/**
	 * Long operation is complete, start up again.
	 *
	 * @param {String} key
	 */
	async go(key) {
		if (this._mutexes[key]) {
			//remove this promise
			this._mutexes[key].promises.shift()
			this._mutexes[key].resolvers.shift()
			this._mutexes[key].count--

			//if we are done, clear
			if (this._mutexes[key].count === 0) {
				delete this._mutexes[key]
			} else {
				//otherwise resolve the next promise
				this._mutexes[key].resolvers[0]()
			}
		}
	}

	/**
	 * Are we currently pending a long operation?
	 *
	 * @param {Boolean} key
	 */
	async isWaiting(key) {
		return !!this._mutexes[key]
	}

	validateEventContract(eventContract) {
		if (!eventContract || !eventContract.events) {
			console.warn(
				'⚠️  The event contract is invalid.  Check your config/default.js file.  The "eventContracts" key must be of the form:'
			)
			throw new Error('INVALID_EVENT_CONTRACT')
		}
	}

	/**
	 * Audit log or logs to send
	 *
	 * @param auditLogs
	 */
	audit(auditLogs) {
		if (!Array.isArray(auditLogs)) {
			auditLogs = [auditLogs]
		}
		// Don't wait for the result
		this.https
			.post(`/audit`, auditLogs)
			.then(() => {})
			.catch(e => log.warn(e))
	}
}

module.exports = Sprucebot
