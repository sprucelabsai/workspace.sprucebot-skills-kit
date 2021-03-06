import Https from './https'
import clone from 'lodash/clone'
// TODO: Is there a better way we can include global definitions without the import?
// @ts-ignore
import global from './interfaces/global' // eslint-disable-line

export interface IAbstractSprucebotAdapterOptions {
	host: string
	apiKey: string
	id: string
	version: string
	allowSelfSignedCerts?: boolean
	additional?: Record<string, any>
}

export interface IGQLTag {
	loc: { source: { body: string } }
}
/** the options you can pass when emitting an event to a location */
export interface IEmitEventOptions {
	/** how long should each skill have to respond in milliseconds? defaults to 5000 */
	timeout?: number
	/** if a skill responds with a non 200 type, should I try again? */
	retry?: boolean
	/** If a human is logged in and invoking this event, setting loggedInUser to the person's UUID lets other skills do permission checks against them */
	loggedInUserId?: string
	/** Give your event a UUID and I'll pass it onto skills. This is helpful when logging errors */
	eventId?: string
}

/** the options you can pass when emitting an event to an org */
export interface IEmitOrganizationEventOptions extends IEmitEventOptions {
	/** By default, an org event emits once to every skill at the org. setting this to true will emit the event to every location individually (meaning a 1k location chain will hit each skill 1k times): WARNING, use sparingly */
	emitToAllLocations?: boolean
}

export abstract class AbstractSprucebotAdapter {
	public abstract gql(
		gql: string,
		variables?: Record<string, any>
	): Promise<any>
	public abstract get(
		path: string,
		queryParams?: Record<string, any>
	): Promise<any>
	public abstract post(
		path: string,
		data?: Record<string, any>,
		queryParams?: Record<string, any>,
		method?: string,
		version?: string
	): Promise<any>
	public abstract patch(
		path: string,
		data?: Record<string, any>,
		queryParams?: Record<string, any>
	): Promise<any>
	public abstract put(
		path: string,
		data?: Record<string, any>,
		queryParams?: Record<string, any>,
		version?: string
	): Promise<any>
	public abstract delete(
		path: string,
		queryParams?: Record<string, any>
	): Promise<any>
}

export interface IAuditLog {
	type: string
	action: string
	description: string
	userId?: string
	locationId?: string
	organizationId?: string
	meta: Record<string, any>
}

export interface IEventResponse {
	skill: { name: string; slug: string }
	error: any
	payload: Record<string, any>
}

export enum IMessageType {
	Promotional = 'promotional',
	Transactional = 'transactional',
	Auth = 'auth'
}

interface IMessageOptions {
	linksToWebView?: boolean
	webViewQueryData?: Record<string, any>
	payload?: Record<string, any>
	sendAtTimestamp?: number
	type:
		| IMessageType.Promotional
		| IMessageType.Transactional
		| IMessageType.Auth
}

interface IMessage {
	(
		locationId: string,
		userId: string,
		message: string,
		options?: IMessageOptions,
		query?: Record<string, any>,
		webViewQueryData?: Record<string, any>
	): Promise<any>
}

export default class Sprucebot {
	public adapter: AbstractSprucebotAdapter

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
	private uiEnhancementContract: Record<string, any>
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
		'svgIcon'
	]
	private suggestedParams = [
		'uiEnhancementContract',
		'eventContract',
		'acl',
		'viewVersion'
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
		uiEnhancementContract?: Record<string, any> // TODO: Define event contract more specifically
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
			uiEnhancementContract,
			version = 'unknown',
			skillsKitVersion = 'unknown',
			acl,
			viewVersion
		} = options

		// const hostMatches = host.match(/^(https?\:\/\/|)([^\/:?#]+)(?:[\/:?#]|$)/i)
		const hostMatches = host.match(/^(https?:\/\/|)([^/:?#]+)(?:[/:?#]|$)/i)
		if (!hostMatches || !hostMatches[2]) {
			throw new Error('Invalid "host" passed to Sprucebot constructor')
		}
		const cleanedHost = hostMatches[2]

		this.name = name
		this.description = description
		this.icon = svgIcon
		this.webhookUrl = serverUrl + '/hook.json'
		this.iframeUrl = interfaceUrl
		this.acl = acl || {}
		this.viewVersion = viewVersion || 1
		this.marketingUrl = interfaceUrl + '/marketing'

		this.dbEnabled = dbEnabled
		this.eventContract = eventContract || {
			events: {}
		}
		this.uiEnhancementContract = uiEnhancementContract || {
			provides: {},
			enhances: {}
		}
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

	public setAdapter(adapter: AbstractSprucebotAdapter): this {
		this.adapter = adapter
		return this
	}

	/**
	 * Sync the settings saved here with specified host (including name,)
	 */
	public async sync(): Promise<Record<string, any>> {
		this.validateEventContract(this.eventContract)

		const result = await this.mutation(
			`
				mutation($input: syncSkillInput!) {
					syncSkill(input: $input) {
						databaseUrl
						s3Bucket
					}
				}
			`,
			{
				input: {
					name: this.name,
					description: this.description,
					icon: this.icon,
					webhookUrl: this.webhookUrl,
					iframeUrl: this.iframeUrl,
					marketingUrl: this.marketingUrl,
					eventContract: JSON.stringify(this.eventContract),
					uiEnhancementContract: JSON.stringify(this.uiEnhancementContract),
					version: this.version,
					skillsKitVersion: this.skillsKitVersion,
					acl: JSON.stringify(this.acl),
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

	public async provisionDatabase(): Promise<any> {
		return this.adapter.get('/database/provision')
	}

	/**
	 * Make a GQL query against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL query to send to the API
	 */
	public async query(
		query: string | IGQLTag,
		variables?: Record<string, any>
	): Promise<any> {
		const queryString =
			typeof query === 'string' ? query : query.loc.source.body
		return this.adapter.gql(queryString, variables)
	}

	/**
	 * Make a GQL mutation against the API. See https://developer.spruce.ai
	 *
	 * @param query The GQL mutation to send to the API
	 */
	public async mutation(
		query: string | IGQLTag,
		variables?: Record<string, any>
	): Promise<any> {
		const queryString =
			typeof query === 'string' ? query : query.loc.source.body

		const gql =
			queryString.search('mutation') === 0
				? queryString
				: `mutation ${queryString}`
		return this.adapter.gql(gql, variables)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. Use sequelize models to query for users. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch a user based on their id and location
	 */
	public async user(
		locationId: string,
		userId: string,
		query?: Record<string, any>
	): Promise<Record<string, any>> {
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
	public async globalUser(
		userId: string,
		query?: Record<string, any>
	): Promise<Record<string, any>> {
		return this.adapter.get(`/ge/users/${userId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get all locations. GLOBAL SKILLS ONLY
	 *
	 * @param {Object} Optional query string to be added to the request
	 */
	public async globalLocations(
		query?: Record<string, any>
	): Promise<Record<string, any>> {
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
	public async createUser(
		values: Record<string, any>
	): Promise<Record<string, any>> {
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
	public async updateRole(
		locationId: string,
		userId: string,
		role: string
	): Promise<Record<string, any>> {
		return this.adapter.patch(
			`/ge/locations/${locationId}/users/${userId}/${role}`
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this location
	 */
	public async users(
		locationId: string,
		options: {
			role?: string
			status?: string
			page?: number
			limit?: number
			q?: any
		} = {}
	): Promise<Record<string, any>> {
		return this.adapter.get(`/locations/${locationId}/users/`, options)
	}
	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Search for users who have been to this organization
	 */
	public async orgUsers(
		organizationId: string,
		options: {
			role?: string
			status?: string
			page?: number
			limit?: number
			q?: Record<string, any>
		} = {}
	): Promise<Record<string, any>> {
		return this.adapter.get(`/organizations/${organizationId}/users/`, options)
	}

	// Update a user who has been to this location
	public async updateGuest(
		id: string,
		values: Record<string, any>
	): Promise<Record<string, any>> {
		return this.mutation(
			`
				mutation($input: updateGuestInput!) {
					updateGuest(input: $input) {
						User {
							id
							firstName
							lastName
							phoneNumber
						}
					}
				}
			`,
			{
				input: {
					id,
					...values
				}
			}
		)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Get a location by id
	 */
	public async location(
		locationId: string,
		query?: Record<string, any>
	): Promise<Record<string, any>> {
		return this.adapter.get(`/locations/${locationId}`, query)
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Fetch all locations where this skill is installed
	 *
	 */
	public async locations(
		options: {
			page?: number
			limit?: number
		} = {}
	): Promise<Record<string, any>> {
		return this.adapter.get('/locations', options)
	}

	/**
	 * Send a message to a user.
	 */
	public message: IMessage = async (
		locationId,
		userId,
		message,
		options,
		query
	): Promise<Record<string, any>> => {
		const data: Record<string, any> = {
			userId,
			message,
			type: IMessageType.Promotional
		}

		if (options) {
			const { type, webViewQueryData, linksToWebView } = options
			data.type = type
			data.linksToWebView = linksToWebView
			if (webViewQueryData) {
				data.webViewQueryData = JSON.stringify(webViewQueryData)
			}
		}

		return this.adapter.post(`/locations/${locationId}/messages`, data, query)
	}

	/**
	 * Deletes a message.
	 */
	public async deleteMessage(
		locationId: string,
		messageId: string
	): Promise<Record<string, any>> {
		return this.adapter.delete(`/locations/${locationId}/messages/${messageId}`)
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 */
	public async queueMessages(
		messages: {
			userId: string
			message: string
			sendAtTimestamp?: number
			linksToWebView?: boolean
			webViewQueryData?: Record<string, any>
			type?: IMessageType.Promotional | IMessageType.Transactional
		}[]
	): Promise<Record<string, any>> {
		return this.adapter.post('/ge/messages', {
			messages
		})
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE ENTERPRISE OR GLOBAL.
	 * Queues multiple messages to be sent
	 *
	 */
	public async deleteMessages(
		messageIds: string[]
	): Promise<Record<string, any>> {
		return this.adapter.post('/ge/deleteMessages', { messageIds })
	}

	/**
	 * ONLY APPLIES TO SKILLS THAT ARE GLOBAL (are not attached to a location).
	 * This allows Sprucebot to communicate to business owners without them
	 * actually needing any skills enabled. Core usage only.
	 */
	public async globalMessage(
		userId: string,
		message: string,
		type = IMessageType.Promotional
	): Promise<Record<string, any>> {
		return this.adapter.post('/messages', {
			userId,
			message,
			type
		})
	}

	/**
	 * Get a bunch of meta data at once
	 *
	 * @param {Object} query
	 * @param {Boolean} suppressErrors
	 */
	public async metas(
		options: {
			key?: string
			locationId?: string
			userId?: string
			createdAt?: string
			updatedAt?: string
			sortBy?: string
			order?: string
			limit?: number
			value?: any
			roles?: string[]
		} = {}
	): Promise<Record<string, any>> {
		const query: Record<string, any> = clone(options)

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
	public async meta(
		key: string,
		options: {
			locationId?: string
			userId?: string
			value?: any
			sortBy?: string
			order?: string
		} = {}
	): Promise<Record<string, any>> {
		const query: Record<string, any> = clone(options)
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
	public async metaById(
		id: string,
		options: {
			locationId?: string
			userId?: string
		} = {}
	): Promise<Record<string, any>> {
		return this.adapter.get(`/data/${id}`, options)
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Create a meta data record.
	 *
	 */
	public async createMeta(
		key: string,
		value: any,
		options: {
			locationId?: string
			userId?: string
		} = {}
	): Promise<Record<string, any>> {
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
	public async updateMeta(
		id: string,
		options: {
			key?: string
			value?: any
			locationId?: string
			userId?: string
		}
	): Promise<Record<string, any>> {
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
	public async metaOrCreate(
		key: string,
		value: any,
		options: {
			locationId?: string
			userId?: string
		} = {}
	): Promise<Record<string, any>> {
		let meta = await this.meta(key, options)

		// not found, create it
		if (!meta) {
			meta = await this.createMeta(key, value, options)
		}
		return meta
	}
	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Creates a meta if it does not exist, updates it if it does
	 */
	public async upsertMeta(
		key: string,
		value: any,
		options: {
			locationId?: string
			userId?: string
		} = {}
	): Promise<Record<string, any>> {
		let meta = await this.meta(key, options)

		// not found, create it
		if (!meta) {
			meta = await this.createMeta(key, value, options)
		} else if (JSON.stringify(meta.value) !== JSON.stringify(value)) {
			//found, but value has changed
			meta = await this.updateMeta(meta.id, {
				value
			})
		}
		return meta
	}

	/**
	 * @deprecated in favor of new metadata implementation. Check out the docs at https://developer.spruce.ai
	 *
	 * Delete meta data by id
	 */
	public async deleteMeta(id: string): Promise<Record<string, any>> {
		return this.adapter.delete(`/data/${id}`)
	}

	/** Emit a custom event. The response is the response from all skills */
	public async emit<TPayload = Record<string, any>>(
		/** the location that will receive this event */
		locationId: string,
		/** the name of the event */
		eventName: string,
		/** any data you want passed with the event */
		payload?: TPayload,
		/** options to control how the event behaves */
		options?: IEmitEventOptions,
		/** DEPRECATED, please pass options.eventId */
		eventId?: string
	): Promise<IEventResponse[]> {
		let actualEventId = eventId
		if (options && options.eventId) {
			actualEventId = options.eventId
		}

		if (eventId) {
			log.warn(
				'Deprecation Warning: Please pass eventId as an option going forward'
			)
		}

		return this.adapter.post(`locations/${locationId}/emit`, {
			eventName,
			eventId: actualEventId,
			payload: payload || {},
			options
		})
	}

	/** Emit a custom event to all locations under an organization. The response is the response from all skills */
	public async emitOrganization(
		/** id of the org we're emitting to */
		organizationId: string,
		/** the name of the event you want to emit */
		eventName: string,
		/** any data you want to pass with the event */
		payload: Record<string, any> = {},
		/** options to configure how the event behaves */
		options?: IEmitOrganizationEventOptions,
		/** Deprecated, pass options.eventId */
		eventId?: string
	): Promise<IEventResponse[]> {
		let actualEventId = eventId
		if (options && options.eventId) {
			actualEventId = options.eventId
		}

		if (eventId) {
			log.warn(
				'Deprecation Warning: Please pass eventId as an option going forward'
			)
		}

		return this.adapter.post(`organizations/${organizationId}/emit`, {
			eventName,
			eventId: actualEventId,
			payload,
			options
		})
	}

	/**
	 * Get metadata
	 *
	 * @param {Object} query
	 */
	public async getMetadata(
		query?: Record<string, any>
	): Promise<Record<string, any>> {
		const meta = await this.adapter.get('/metadata', query)
		return meta
	}

	/**
	 * Set metadata
	 *
	 * @param {Object} metadata
	 */
	public async setMetadata(options: {
		locationId?: string
		organizationId?: string
		userId?: string
		refId?: string
		metadata?: any
	}): Promise<Record<string, any>> {
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
	public async deleteMetadata(options: {
		keys?: string[]
		locationId?: string
		organizationId?: string
		userId?: string
		refId?: string
	}): Promise<void> {
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
	}

	/**
	 * @deprecated since v2 of the Sprucebot API. GQL is the preferred way of interacting with the API. Check out the docs at https://developer.spruce.ai
	 *
	 * Create location (Enterprise Skills only)
	 *
	 */
	public async eCreateLocations(options: {
		organizationId: string
		locations: Record<string, any>[]
	}): Promise<Record<string, any>> {
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
	public async gCreateLocations(options: {
		locations: Record<string, any>[]
	}): Promise<Record<string, any>> {
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
	public async eEmitEvent(options: {
		userId: string
		locationId: string
		eventName: string
		payload?: Record<string, any>
	}): Promise<Record<string, any>> {
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

	public async setUserImageFromUrl(options: {
		userId: string
		organizationId: string
		url: string
	}) {
		const { userId, organizationId, url } = options
		const result = await this.adapter.put(
			`/organizations/${organizationId}/guests/${userId}/profileImageUrl`,
			{ url },
			{},
			'2.0'
		)

		return result
	}

	/**
	 * To stop race conditions, you can have requests wait before starting the next.
	 *
	 * @param {String} key
	 */
	public async wait(key: string): Promise<void> {
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
			const resolver = (resolve: any): void => {
				this._mutexes[key].resolvers.push(resolve)
			}
			const promise = new Promise(resolver)
			this._mutexes[key].promises.push(promise)
		}

		return this._mutexes[key].promises[this._mutexes[key].count - 1]
	}

	/**
	 * Long operation is complete, start up again.
	 *
	 * @param {String} key
	 */
	public async go(key: string): Promise<void> {
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
	public async isWaiting(key: string): Promise<boolean> {
		return !!this._mutexes[key]
	}

	public validateEventContract(eventContract: Record<string, any>): void {
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
	public audit(auditLogs: IAuditLog | IAuditLog[]): void {
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
