import Https from './https'
import MockHttps from './mock'

export abstract class AbstractSprucebotAdapter {
	public abstract query(queryParams: string): Promise<any>
	public abstract get(path: string, queryParams?: Record<string, any>): Promise<any>
	public abstract post(path: string, data?: Record<string, any>, queryParams?: Record<string, any>, method?: string): Promise<any>
	public abstract patch(path: string, data?: Record<string, any>, queryParams?: Record<string, any>): Promise<any>
	public abstract delete(path: string, queryParams?: Record<string, any>): Promise<any>
}

export interface IAuditLog {
	type: string,
	action: string,
	description: string,
	userId?: string,
	locationId?: string,
	organizationId?: string,
	meta: Record<string, any>
}

export default class Sprucebot {
	private name: string
	private description: string
	private icon: string
	private webhookUrl: string
	private iframeUrl: string
	private acl: Record<string, any>
	private viewVersion: number
	private marketingUrl: string
	private dbEnabled: boolean
	private eventContract: Record<string, any>
	private version: string
	private skillsKitVersion: string
	private apiVersion: string
	private adapterOptions: Record<string, any>
	private adapter: AbstractSprucebotAdapter
	private _mutexes: Record<string, any>
	private requiredParams = [
		'apiKey',
		'id',
		'host',
		'name',
		'description',
		'interfaceUrl',
		'serverUrl',
		'svgIcon',
	]
	private suggestedParams = [
		'eventContract',
		'acl',
		'viewVersion',
	]

	public constructor(options: {
		apiKey: string
		id: string
		host: string
		name: string
		description: string
		interfaceUrl: string
		serverUrl: string
		svgIcon: string
		allowSelfSignedCerts?: boolean
		dbEnabled?: boolean
		eventContract?: Record<string, any> // TODO: Define event contract more specifically
		version?: string
		skillsKitVersion?: string
		acl?: Record<string, any> // TODO: Define acls type
		viewVersion?: number
	}) {
		this.validateConstructorParams(options)
		const {
			apiKey,
			id,
			host,
			name,
			description,
			interfaceUrl,
			serverUrl,
			svgIcon,
			allowSelfSignedCerts = false,
			dbEnabled = false,
			eventContract,
			version = 'unknown',
			skillsKitVersion = 'unknown',
			acl,
			viewVersion
		} = options

		const hostMatches = host.match(/^(https?\:\/\/|)([^\/:?#]+)(?:[\/:?#]|$)/i)
		if (!hostMatches || !hostMatches[2]) {
			throw new Error('Invalid "host" passed to Sprucebot constructor')
		}
		const cleanedHost = hostMatches[2]

		this.name = name
		this.description = description
		this.icon = svgIcon
		this.webhookUrl = serverUrl  + '/hook.json'
		this.iframeUrl = interfaceUrl
		this.acl = acl || {}
		this.viewVersion = viewVersion || 1
		this.marketingUrl = interfaceUrl  + '/marketing'

		this.dbEnabled = dbEnabled
		this.eventContract = eventContract || { events: {} }
		this._mutexes = {}

		this.version = version // skill version
		this.skillsKitVersion = skillsKitVersion // skills kit version
		this.apiVersion = '1.0' // maybe pull from package.json?

		// Setup http(s) class with everything it needs to talk to api
		const adapterOptions = {
			host: cleanedHost,
			apiKey,
			id,
			version: this.apiVersion,
			allowSelfSignedCerts
		}

		this.adapterOptions = adapterOptions
		this.adapter = new Https(adapterOptions)

		console.log(
			`🌲 Sprucebot🌲 Skills Kit API ${
				this.version
			}\n\nhost : ${cleanedHost} \nid : ${id} \napiKey : ${apiKey.replace(
				/./g,
				'*'
			)} \nname : ${name}\n---------------------------------`
		)
	}

	setOptions(options) {
		if (options.useMockApi) {
			const customMocks = options.customMocks || {}
			this.adapter = new MockHttps({ ...this.adapterOptions, customMocks })
		}
	}

	/**
	 * Sync the settings saved here with specified host (including name,)
	 */
	async sync() {
		this.validateEventContract(this.eventContract)

		const result = await this.mutation(`{
			syncSkill(input: {
				name: "${this.name}"
				description: "${this.description}"
				icon: ${JSON.stringify(this.icon)}
				webhookUrl: "${this.webhookUrl}"
				iframeUrl: "${this.iframeUrl}"
				marketingUrl: "${this.marketingUrl}"
				eventContract: ${JSON.stringify(JSON.stringify(this.eventContract))}
				version: "${this.version}"
				skillsKitVersion: "${this.skillsKitVersion}"
				acl: ${JSON.stringify(JSON.stringify(this.acl))}
				viewVersion: ${this.viewVersion}
				useDB: ${this.dbEnabled === true}
			}) {
				databaseUrl
				s3Bucket
			}
		}`)

		if (result.errors || !result.data || !result.data.syncSkill) {
			log.fatal(result.errors)
			throw new Error('Error syncing skill settings with API')
		}

		return {
			...result.data.syncSkill
		}
	}

	async provisionDatabase() {
		return this.adapter.get('/database/provision')
	}

	/**
	 * Make a GQL query against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL query to send to the API
	 */
	async query(query: string): Promise<any> {
		return this.adapter.query(query)
	}

	/**
	 * Make a GQL mutation against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL mutation to send to the API
	 */
	async mutation(query: string): Promise<any> {
		return this.adapter.query(`mutation ${query}`)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch a user based on their id and location
	 *
	 * @param {String} userId
	 * @param {String} locationId
	 * @param {Object} query Optional query string to be added onto request
	 * @returns {Promise}
	 */
	async user(locationId, userId, query) {
		return this.adapter.get(`/locations/${locationId}/users/${userId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get a user without a location. GLOBAL SKILLS ONLY
	 *
	 * @param {String} userId
	 * @param {Object} Optional query string to be added to the request
	 */
	async globalUser(userId, query) {
		return this.adapter.get(`/ge/users/${userId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get all locations. GLOBAL SKILLS ONLY
	 *
	 * @param {Object} Optional query string to be added to the request
	 */
	async globalLocations(query) {
		return this.adapter.get(`/ge/locations`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Create a user
	 *
	 * @param {Object} values
	 * @returns {Promise}
	 */
	async createUser(values) {
		return this.adapter.post('/ge/users', values)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Update a users role
	 *
	 * @param {String} locationId
	 * @param {String} userId
	 * @param {String} role
	 * @returns {Promise}
	 */
	async updateRole(locationId, userId, role) {
		return this.adapter.patch(
			`/ge/locations/${locationId}/users/${userId}/${role}`
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this location
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async users(locationId, { role, status, page, limit, q } = {}) {
		return this.adapter.get(
			`/locations/${locationId}/users/`,
			Array.from(arguments)[1]
		)
	}
	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this organization
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async orgUsers(organizationId, { role, status, page, limit, q } = {}) {
		return this.adapter.get(
			`/organizations/${organizationId}/users/`,
			Array.from(arguments)[1]
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Update for user who have been to this location
	 *
	 * @param {String} id
	 * @param {Object} values
	 * @returns {Promise}
	 */
	async updateUser(id, values) {
		return this.adapter.patch('/users/' + id, values)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get a location by id
	 *
	 * @param {String} locationId
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async location(locationId, query) {
		return this.adapter.get(`/locations/${locationId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch all locations where this skill is installed
	 *
	 * @param {Object} query
	 * @returns {Promise}
	 */
	async locations({ page, limit } = {}) {
		return this.adapter.get('/locations', Array.from(arguments)[0])
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
		{ linksToWebView, webViewQueryData, payload, sendAtTimestamp, type } = {},
		query = {}
	) {
		const data = Array.from(arguments)[3] || { type: 'promotional' }
		data.userId = userId
		data.message = message
		if (data.webViewQueryData) {
			data.webViewQueryData = JSON.stringify(data.webViewQueryData)
		}
		return this.adapter.post(`/locations/${locationId}/messages`, data, query)
	}

	/**
	 * Deletes a message.
	 *
	 * @param {String} locationId
	 * @param {String} messageId
	 */
	async deleteMessage(locationId, messageId) {
		return this.adapter.delete(`/locations/${locationId}/messages/${messageId}`)
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async queueMessages(messages) {
		return this.adapter.post('/ge/messages', { messages })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async deleteMessages(messageIds) {
		return this.adapter.post('/ge/deleteMessages', { messageIds })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE GLOBAL (are not attached to a location).
	 * This allows Sprucebot to communicate to business owners without them
	 * actually needing any skills enabled. Core usage only.
	 *
	 * @param {String} userId
	 * @param {String} message
	 */
	async globalMessage(userId, message, type = 'promotional') {
		return this.adapter.post('/messages', { userId, message, type })
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
		return this.adapter.get('/data', query)
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
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
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Get skill meta data by id
	 *
	 * @param {String} id
	 */
	async metaById(id, { locationId, userId } = {}) {
		return this.adapter.get(`/data/${id}`, Array.from(arguments)[1])
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
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

		const meta = await this.adapter.post('/data', data)
		return meta
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Update some meta data by id
	 *
	 * @param {String} id
	 * @param {Object} data
	 */
	async updateMeta(id, { key, value, locationId, userId }) {
		const data = {
			...(Array.from(arguments)[1] || {})
		}

		const meta = await this.adapter.patch(`/data/${id}`, data)
		return meta
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
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
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
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
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Delete meta data by id
	 *
	 * @param {String} id
	 */
	async deleteMeta(id) {
		return this.adapter.delete(`/data/${id}`)
	}

	/**
	 * Emit a custom event. The response is the response from all skills
	 *
	 * @param {String} name
	 * @param {Object} payload
	 */
	async emit(locationId, eventName, payload = {}, options, eventId) {
		return this.adapter.post(`locations/${locationId}/emit`, {
			eventName,
			eventId,
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
	async emitOrganization(
		organizationId,
		eventName,
		payload = {},
		options,
		eventId
	) {
		return this.adapter.post(`organizations/${organizationId}/emit`, {
			eventName,
			eventId,
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
		const meta = await this.adapter.get('/metadata', query)
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

		const meta = await this.adapter.patch('/metadata', data)
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
			await this.adapter.delete('/metadata', data)
		}
		return
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Create location (Enterprise Skills only)
	 *
	 * @param {String} organizationId
	 * @param {Array} locations
	 */
	async eCreateLocations({ organizationId, locations }) {
		const result = await this.adapter.post(
			`/e/organizations/${organizationId}/locations`,
			{ locations }
		)
		return result
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Create location (Global Skills only)
	 *
	 * @param {Array} locations
	 */
	async gCreateLocations({ locations }) {
		const result = await this.adapter.post('/g/locations', { locations })
		return result
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. Use emit() or emitOrganization() instead. Check out the docs at https://developer.spruce.ai
	 *
	 * Emit any event as an Enterprise skill.
	 *
	 * @param {Object} response
	 */
	async eEmitEvent({ userId, locationId, eventName, payload }) {
		const result = await this.adapter.post(
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
	async wait(key: string): Promise<void> {
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
	async go(key: string): Promise<void> {
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
	 * Are we currently pending a long operation? Checks the provided key
	 *
	 * @param {String} key
	 */
	async isWaiting(key: string): Promise<boolean> {
		return !!this._mutexes[key]
	}

	validateEventContract(eventContract: Record<string, any>) {
		if (!eventContract || !eventContract.events) {
			console.warn(
				'⚠️  The event contract is invalid.  Check your config/default.js file.  The "eventContracts" key must be of the form:'
			)
			throw new Error('INVALID_EVENT_CONTRACT')
		}
	}

	/**
	 * Create audit logs when data in your skill is changed so we can keep track of who/what changed it.
	 *
	 * You can pass this method a single object or an array of objects
	 *
	 * {
	 * 	type: 'createAppointment', // Unique key for the audit type
	 * 	action: 'created an appointment', // Short description of the action taken
	 * 	description: 'Mr. Bot created an appointment for Ms. Spruce at 10am on Thursday',
	 * 	userId: '6cdf0a33-6cb6-4742-946d-9ac30e614405', // (optional) UUID of the user performing the action
	 * 	locationId?: '9efa8aea-1ccd-4d8c-b3e7-616cadaa3ddf', // (optional) UUID of the location where this happened
	 * 	organizationId?: '9a43d7f0-393e-4202-a067-ddd99b114914', // (optional) UUID of the organization where this happened
	 * 	meta: {
	 *   appointmentId: '1234abc'
	 *  } // (optional) Any additional metadata
	 * }
	 */
	audit(auditLogs: IAuditLog | IAuditLog[]): void {
		if (!Array.isArray(auditLogs)) {
			auditLogs = [auditLogs]
		}
		// Don't wait for the result
		this.adapter
			.post(`/audit`, auditLogs)
			.then(() => {})
			.catch(e => log.warn(e))
	}

	private validateConstructorParams(params: Record<string, any>): void {
		this.requiredParams.forEach(requiredParam => {
			if (typeof params[requiredParam] === 'undefined') {
				throw new Error(
					`You are missing some params! Make sure you set ${requiredParam} properly (maybe .env) 🤷🏼‍`
				)
			}
		})
		this.suggestedParams.forEach(suggestedParam => {
			if (typeof params[suggestedParam] === 'undefined') {
				console.log(
					`⚠️  Missing key in Sprucebot() constructor. Check your server.js and environment variables: ${suggestedParam}`
				)
			}
		})
	}
}
