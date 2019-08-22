import { ISpruceSkillContext } from '../types/ctx'
import SpruceSkillService from './base/SpruceSkillService'

// We could have multiple cache options in the future as long as they all conform
// See ./cache/ for adapters
export abstract class AbstractSpruceSkillCacheAdapter {
	public abstract init(options: {
		url?: string
		defaultTTL?: number
		isDisabled?: boolean
		keyPrefix?: string
	}): void
	public abstract async get(key: string): Promise<Record<string, any> | void>
	public abstract async set(key: string, val: any, ttl?: number): Promise<void>
	public abstract async del(key: string): Promise<number>
	public abstract async delWildcard(key: string): Promise<void>
	public abstract isConnected(): boolean
}

export default class Cache extends SpruceSkillService<ISpruceSkillContext> {
	private cache?: AbstractSpruceSkillCacheAdapter
	private isEnabled = false
	private logDebug = false

	public constructor(options: {
		ctx: ISpruceSkillContext
		config?: {
			adapter?: string
			enable?: boolean
			logDebug?: boolean
			keyPrefix?: string
			options?: {
				url?: string
				ttl?: number
			}
		}
	}) {
		super(options)
		const { config } = options
		if (!config || !config.adapter || !config.options || !config.options.url) {
			log.info('Cache: DISABLED. Configuration for cache is invalid')
			return
		}

		if (config.enable !== true) {
			log.info('Cache: DISABLED. config.cache.enable is not true')
			return
		}

		this.logDebug = config.logDebug === true

		this.setAdapter({
			adapter: config.adapter,
			keyPrefix: config.keyPrefix,
			url: config.options.url,
			ttl: config.options.ttl || 300
		})
	}

	public init(options: { isEnabled: boolean; adapter: string }): void {
		const { isEnabled, adapter } = options
		this.isEnabled = isEnabled
		if (!this.isEnabled) {
			log.info('CACHE: DISABLED')
			return
		}
		this.setAdapter(adapter)
	}

	public set(key: string, value: any, ttl?: number): void {
		this.setAsync(key, value, ttl)
			.then(() => {})
			.catch(e => {
				log.warn(`Error setting cache key: ${key}`, { err: e })
			})
	}

	public async setAsync(key: string, value: any, ttl?: number): Promise<void> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Set Skipped: ${key}`)
			return
		}

		await this.cache.set(key, value, ttl)
		this.debugLog(`Cache key set: ${key}`)
	}

	public async get(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Get Skipped: ${key}`)
			return null
		}

		return this.cache.get(key)
	}

	public del(key: string): void {
		this.delAsync(key)
			.then(() => {})
			.catch(e => {
				log.warn(`Error deleting cache key: ${key}`, { err: e })
			})
	}
	public async delAsync(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Del Skipped: ${key}`)
			return null
		}

		return this.cache.del(key)
	}

	public async delWildcard(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Delete Wildcard Skipped: ${key}`)
			return null
		}

		return this.cache.delWildcard(key)
	}

	public async delWildcardAsync(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Delete Wildcard Skipped: ${key}`)
			return null
		}

		await this.cache.delWildcard(key)
		this.debugLog(`Wildcard cache key deleted: ${key}`)
	}

	public isConnected(): boolean {
		if (!this.cache || !this.isEnabled) {
			return false
		}
		return this.cache.isConnected()
	}

	private debugLog(message: string): void {
		if (this.logDebug) {
			log.debug('CacheService:', message)
		}
	}

	private setAdapter(options: {
		adapter: string
		keyPrefix?: string
		url: string
		ttl: number
	}): void {
		const { adapter, url, ttl, keyPrefix } = options
		if (adapter) {
			const filename = `${adapter.charAt(0).toUpperCase()}${adapter.slice(1)}`
			try {
				const adapter = require(`./cache/${filename}`).default
				this.cache = new adapter({
					url,
					defaultTTL: ttl,
					keyPrefix
				})
			} catch (e) {
				log.crit(`CacheService: Unable to load adapter: ${filename}`)
			}
		}
	}
}

// import { ISpruceSkillContext } from '../types/ctx'
// import SpruceSkillService from './base/SpruceSkillService'

// export default class Cache extends SpruceSkillService {
// 	private cache?: AbstractSpruceSkillCacheAdapter

// 	public constructor(options: {
// 		ctx: ISpruceSkillContext
// 		config: Record<string, any>
// 	}) {
// 		super(options)
// 		if ()
// 	}

// 	async init({ cache, options = {} } = {}) {
// 		if (cache && !options.disable) {
// 			this.cache = require(cache)
// 			this.cache.init(options)
// 		}
// 	}

// 	set(key, value, ttl) {
// 		if (!this.cache) {
// 			log.debug(`Cache Set Skipped: ${key}`)
// 			return
// 		}

// 		return this.cache.set(key, value, ttl)
// 	}

// 	async get(key) {
// 		if (!this.cache) {
// 			log.debug(`Cache Get Skipped: ${key}`)
// 			return null
// 		}

// 		return this.cache.get(key)
// 	}

// 	async del(key) {
// 		if (!this.cache) {
// 			log.debug(`Cache Del Skipped: ${key}`)
// 			return null
// 		}

// 		return this.cache.del(key)
// 	}

// 	async delWildcard(key) {
// 		if (!this.cache) {
// 			log.debug(`Cache Delete Wildcard Skipped: ${key}`)
// 			return null
// 		}

// 		return this.cache.delWildcard(key)
// 	}
// }
