import Https from './https'
import clone from 'lodash/clone'

// export { default as MockHttps } from './mock'

export interface IAbstractSprucebotAdapterOptions {
    host: string
    apiKey: string
    id: string
    version: string
    allowSelfSignedCerts?: boolean
    additional?: Record<string, any>
}

export abstract class AbstractSprucebotAdapter {
	public abstract gql(gql: string, variables?: Record<string, any>): Promise<any>
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

export interface IEventResponse {
    skill: { name: string; slug: string }
    error: any
    payload: Record<string, any>
}

export enum IMessageType {
    PROMOTIONAL = 'promotional',
    TRANSACTIONAL = 'transactional',
    AUTH = 'auth'
}


interface IMessageOptions {
    linksToWebView?: boolean
    webViewQueryData?: Record<string, any>
    payload?: Record<string, any>
    sendAtTimestamp?: number,
    type: IMessageType.PROMOTIONAL | IMessageType.TRANSACTIONAL | IMessageType.AUTH
}



interface IMessage {
    (locationId: string, userId: string, message: string, options?: IMessageOptions, query?: Record<string, any>, webViewQueryData?: Record<string, any> ): Promise<any>
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

    public adapter: AbstractSprucebotAdapter

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

    setAdapter(adapter: AbstractSprucebotAdapter) {
        this.adapter = adapter
    }

	/**
	 * Sync the settings saved here with specified host (including name,)
	 */
	async sync() {
        this.validateEventContract(this.eventContract)

        const result = await this.mutation(`mutation($input: syncSkillInput!) {
            syncSkill(input: $input) {
                databaseUrl
                s3Bucket
            }
        }`, {
                input: {
                    name: this.name,
                    description: this.description,
                    icon:this.icon,
                    webhookUrl: this.webhookUrl,
                    iframeUrl: this.iframeUrl,
                    marketingUrl: this.marketingUrl,
                    eventContract: this.eventContract,
                    version: this.version,
                    skillsKitVersion: this.skillsKitVersion,
                    acl: this.acl,
                    viewVersion: this.viewVersion,
                    useDB: this.dbEnabled
                }
            }
        )

		if (result.errors || !result.data || !result.data.syncSkill) {
			log.fatal(result.errors)
			throw new Error('Error syncing skill settings with API')
		}

		return result.data.syncSkill
	}

	async provisionDatabase() {
		return this.adapter.get('/database/provision')
	}

	/**
	 * Make a GQL query against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL query to send to the API
	 */
	async query(query: string, variables?: Record<string, any>): Promise<any> {
		return this.adapter.gql(query, variables)
	}

	/**
	 * Make a GQL mutation against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL mutation to send to the API
	 */
    async mutation(query: string, variables?: Record<string, any>): Promise<any> {
        const gql = query.search('mutation') === 0 ? query : `mutation ${query}`
		return this.adapter.gql(gql, variables)
    }

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch a user based on their id and location
	 */
	async user(locationId:string, userId:string, query?: Record<string, any>) {
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
	async globalUser(userId: string, query?: Record<string, any>) {
		return this.adapter.get(`/ge/users/${userId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get all locations. GLOBAL SKILLS ONLY
	 *
	 * @param {Object} Optional query string to be added to the request
	 */
	async globalLocations(query?:Record<string, any>) {
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
	async createUser(values: Record<string, any>) {
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
	async updateRole(locationId:string, userId:string, role: string) {
		return this.adapter.patch(
			`/ge/locations/${locationId}/users/${userId}/${role}`
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this location
	 */
	async users(locationId: string, options: { role?:string, status?:string, page?:number, limit?:number, q?:any } = {}) {
		return this.adapter.get(
			`/locations/${locationId}/users/`,
			options
		)
	}
	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this organization
	 */
	async orgUsers(organizationId:string, options:{ role?:string, status?:string, page?:number, limit?:number, q?:Record<string, any> } = {}) {
		return this.adapter.get(
			`/organizations/${organizationId}/users/`,
			options
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Update for user who have been to this location
	 *
	 */
	async updateUser(id:string, values: Record<string, any>) {
		return this.adapter.patch('/users/' + id, values)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get a location by id
	 */
	async location(locationId: string, query?: Record<string, any>) {
		return this.adapter.get(`/locations/${locationId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch all locations where this skill is installed
	 *
	 */
	async locations(options:{ page?:number, limit?:number } = {}) {
		return this.adapter.get('/locations', options)
	}

	/**
	 * Send a message to a user.
	 */
	message :IMessage = async (
		locationId,
		userId,
		message,
		options,
		query
    ) => {

        const data: Record<string, any> = {
            userId,
            message,
            type: IMessageType.PROMOTIONAL
        }

        if (options) {
            const { type, webViewQueryData } = options
            data.type = type
            if (webViewQueryData) {
                data.webViewQueryData = JSON.stringify(webViewQueryData)
            }
        }

		return this.adapter.post(`/locations/${locationId}/messages`, data, query)
	}

	/**
	 * Deletes a message.
	 */
	async deleteMessage(locationId:string, messageId:string) {
		return this.adapter.delete(`/locations/${locationId}/messages/${messageId}`)
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 */
    async queueMessages(messages: { userId: string, message: string, sendAtTimestamp?: number, linksToWebView?: boolean, webViewQueryData?: Record<string, any>,type?: IMessageType.PROMOTIONAL | IMessageType.TRANSACTIONAL}[]) {
		return this.adapter.post('/ge/messages', { messages })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 */
	async deleteMessages(messageIds: string[]) {
		return this.adapter.post('/ge/deleteMessages', { messageIds })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE GLOBAL (are not attached to a location).
	 * This allows Sprucebot to communicate to business owners without them
	 * actually needing any skills enabled. Core usage only.
	 */
	async globalMessage(userId:string, message:string, type = IMessageType.PROMOTIONAL) {
		return this.adapter.post('/messages', { userId, message, type })
	}

	/**
	 * Get a bunch of meta data at once
	 *
	 * @param {Object} query
	 * @param {Boolean} suppressErrors
	 */
	async metas(
        options: {
            key?: string,
            locationId?:string,
            userId?:string,
            createdAt?: string,
            updatedAt?: string,
            sortBy?:string,
            order?:string,
            limit?:number,
            value?:any,
            roles?: string[]
        } = {},
    ) {

        const query :Record<string, any>= clone(options)

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
	 */
	async meta(
		key: string,
        options: { locationId?: string, userId?: string, value?: any, sortBy?: string, order?: string } = {}
	) {
        const query:Record<string, any> = clone(options)
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
	async metaById(id:string, options: { locationId?:string, userId?:string } = {}) {
		return this.adapter.get(`/data/${id}`, options)
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Create a meta data record.
	 *
	 */
	async createMeta(key:string, value:any, options: { locationId?:string, userId?:string } = {}) {
		const data = {
			...options,
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
	async updateMeta(id:string, options: { key?:string, value?:any, locationId?:string, userId?:string }) {
		const data = {
			...options
		}

		const meta = await this.adapter.patch(`/data/${id}`, data)
		return meta
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch some meta. Create it if it does not exist
	 *
	 */
	async metaOrCreate(
		key:string,
		value:any,
		options: { locationId?:string, userId?:string } = {},
	) {
		let meta = await this.meta(
			key,
			options,
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
	 */
	async upsertMeta(
		key:string,
		value: any,
		options:{ locationId?:string, userId?:string } = {},
	) {
		let meta = await this.meta(
			key,
			options,
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
	 */
	async deleteMeta(id:string) {
		return this.adapter.delete(`/data/${id}`)
	}

	/**
	 * Emit a custom event. The response is the response from all skills
	 *
	 */
    async emit(locationId: string, eventName: string, payload: Record<string, any> = {}, options?: Record<string, any>, eventId?: string): Promise<IEventResponse> {
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
		organizationId:string,
		eventName:string,
		payload:Record<string, any> = {},
		options?:Record<string, any>,
		eventId?: string
    ): Promise<IEventResponse[]>{
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
	async getMetadata(query?: Record<string, any>) {
		const meta = await this.adapter.get('/metadata', query)
		return meta
	}

	/**
	 * Set metadata
	 *
	 * @param {Object} metadata
	 */
	async setMetadata(options:{ locationId?:string, organizationId?:string, userId?:string, refId?:string, metadata?:any }) {

        const { locationId, organizationId, userId, refId, metadata } = options
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
	async deleteMetadata(options: { keys?:string[], locationId?:string, organizationId?:string, userId?:string, refId?:string }) {

        const { keys, locationId, organizationId, userId, refId } = options
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
	 */
	async eCreateLocations(options:{ organizationId:string, locations:Record<string, any>[] }) {
        const { organizationId, locations } = options
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
	 */
	async gCreateLocations(options:{ locations: Record<string, any>[] }) {
        const result = await this.adapter.post('/g/locations', options)
		return result
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. Use emit() or emitOrganization() instead. Check out the docs at https://developer.spruce.ai
	 *
	 * Emit any event as an Enterprise skill.
	 *
	 * @param {Object} response
	 */
	async eEmitEvent(options:{ userId:string, locationId:string, eventName:string, payload?:Record<string, any> }) {
        const { locationId, userId, eventName, payload = {} } = options

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
			let resolver = (resolve: any) => {
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
