import IORedis from 'ioredis'
import { AbstractSpruceSkillCacheAdapter } from '../Cache'

export default class Redis implements AbstractSpruceSkillCacheAdapter {
	private client!: IORedis.Redis
	private defaultTTL = 300
	private keyPrefix!: string
	private _isConnected = false

	public constructor(options: {
		url: string
		defaultTTL?: number
		isDisabled?: boolean
		keyPrefix?: string
	}) {
		this.init(options)
	}

	public init(options: {
		url: string
		defaultTTL?: number
		isDisabled?: boolean
		keyPrefix?: string
	}): void {
		const { url, isDisabled, defaultTTL, keyPrefix } = options
		this.keyPrefix = keyPrefix || 'default'
		if (typeof defaultTTL === 'number') {
			this.defaultTTL = defaultTTL
		}
		if (url && !isDisabled) {
			const client = new IORedis(url, { keyPrefix: `${this.keyPrefix}:` })

			client.connect(() => this.onConnect())

			this.client = client
		}
	}

	public async get(key: string): Promise<Record<string, any> | void> {
		if (!this._isConnected) {
			log.debug(`Redis Not isConnected: ${key}`)
			return
		}

		const result = await this.client.get(key)
		if (result) {
			log.debug(`Redis Cache HIT: ${key}`)
			try {
				return JSON.parse(result)
			} catch (e) {
				log.crit(`Unable to parse found redis value for key: ${key}`)
				return
			}
		}

		log.debug(`Redis Cache MISS: ${key}`)
	}

	public async set(key: string, val: any, ttl?: number): Promise<void> {
		if (!this._isConnected) {
			log.debug(`Redis Not isConnected: ${key}`)
			return
		}
		const finalTTL = ttl ? ttl : this.defaultTTL
		try {
			const strVal = JSON.stringify(val)
			await this.client.set(key, strVal)
			this.client.expire(key, finalTTL)
		} catch (e) {
			log.warn(`Unable to set cache key: ${key}`, { err: e })
		}
	}

	public async del(key: string): Promise<number> {
		if (!this._isConnected) {
			log.debug(`Redis Not isConnected: ${key}`)
			return 0
		}
		// In case it's got the prefix (from delWildcard), remove it
		key = key.replace(`${this.keyPrefix}:`, '')

		log.debug(`Cache DELETE: ${key}`)
		const num = await this.client.del(key)
		return num
	}

	public async delWildcard(key: string): Promise<void> {
		if (!this._isConnected) {
			log.debug(`Redis Cache Disabled: ${key}`)
			return
		}
		log.debug(`Cache DELETE: ${key}`)
		const rows = await this.client.keys(`${this.keyPrefix}:${key}`)
		const promises = rows.map(r => this.del(r))
		await Promise.all(promises)
	}

	public isConnected(): boolean {
		return this._isConnected
	}

	private onConnect(): void {
		this._isConnected = true
	}
}

// const config = require('config')
// const _ = require('lodash')
// const IORedis = require('ioredis')

// module.exports = {
// 	client: null,
// 	options: null,
// 	connected: false,

// 	init(options) {
// 		this.connected = false
// 		this.config = options || {}

// 		if (options.url && !options.disable) {
// 			const { url, ttl, ...opts } = options
// 			const client = new IORedis(url, { ...opts, keyPrefix: `${config.SLUG}:` })

// 			client.connect(() => this.onConnect())

// 			this.client = client
// 		}
// 	},

// 	onConnect() {
// 		this.connected = true
// 	},

// 	get(key) {
// 		return new Promise((resolve, reject) => {
// 			if (!this.connected) {
// 				log.debug(`Redis Not Connected: ${key}`)
// 				return resolve(null)
// 			}

// 			try {
// 				this.client.get(key, (err, result) => {
// 					if (err) {
// 						return reject(err)
// 					}
// 					if (result) {
// 						log.debug(`Redis Cache HIT: ${key}`)
// 						return resolve(JSON.parse(result))
// 					}
// 					log.debug(`Redis Cache MISS: ${key}`)
// 					return resolve(result)
// 				})
// 			} catch (e) {
// 				log.warn(e)
// 				return resolve(null)
// 			}
// 		})
// 	},

// 	set(key, val, ttl) {
// 		if (!this.connected) {
// 			log.debug(`Redis Not Connected: ${key}`)
// 			return null
// 		}
// 		ttl = typeof ttl !== 'undefined' ? ttl : this.config.ttl
// 		try {
// 			this.client.set(key, JSON.stringify(val))
// 			this.client.expire(key, ttl)
// 		} catch (e) {
// 			log.warn(e)
// 		}
// 	},

// 	del(key) {
// 		try {
// 			if (!this.connected) {
// 				log.debug(`Redis Not Connected: ${key}`)
// 				return null
// 			}
// 			// In case it's got the prefix (from delWildcard), remove it
// 			key = key.replace(`${config.SLUG}:`, '')

// 			log.debug(`Cache DELETE: ${key}`)
// 			this.client.del(key)
// 		} catch (e) {
// 			log.warn(e)
// 		}
// 	},

// 	delWildcard(key) {
// 		try {
// 			if (!this.connected) {
// 				log.debug(`Redis Cache Disabled: ${key}`)
// 				return null
// 			}
// 			log.debug(`Cache DELETE: ${key}`)
// 			this.client.keys(`${config.SLUG}:${key}`, (err, rows) => {
// 				if (err) {
// 					log.warn(err)
// 					return
// 				}
// 				rows.forEach(row => {
// 					this.del(row)
// 				})
// 			})
// 		} catch (e) {
// 			log.warn(e)
// 		}
// 	}
// }
