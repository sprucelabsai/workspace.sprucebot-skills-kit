import { ISpruceContext } from '../interfaces/ctx'
import SpruceSkillService from '../lib/SpruceSkillService'

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

interface ICacheConfig {
	adapter?: string
	enable?: boolean
	logDebug?: boolean
	keyPrefix?: string
	options?: {
		url?: string
		ttl?: number
	}
}

export default class Cache extends SpruceSkillService<ISpruceContext> {
	private cache?: AbstractSpruceSkillCacheAdapter
	private isEnabled = false
	private logDebug = false

	public constructor(options: { ctx: ISpruceContext; config?: ICacheConfig }) {
		super(options)
		this.init(options.config)
	}

	public init(config?: ICacheConfig): void {
		if (!config || !config.adapter) {
			log.info('Cache: DISABLED. Configuration for cache is invalid', {
				options: config
			})
			return
		}

		if (config.enable !== true) {
			log.info('Cache: DISABLED. config.cache.enable is not true')
			return
		}

		this.isEnabled = true

		this.logDebug = config.logDebug === true

		this.setAdapter({
			adapter: config.adapter,
			keyPrefix: config.keyPrefix,
			url: config.options && config.options.url,
			ttl: (config.options && config.options.ttl) || 300
		})
	}

	/**
	 * Save to the cache
	 *
	 * @param key The key you want to cache against
	 * @param value The value to cache
	 * @param ttl The time-to-live in seconds
	 */
	public set(key: string, value: any, ttl?: number): void {
		this.setAsync(key, value, ttl)
			.then(() => {})
			.catch(e => {
				log.warn(`Error setting cache key: ${key}`, { err: e })
			})
	}

	/**
	 * Save to the cache with the ability to wait for the operation to complete
	 *
	 * @param key The key you want to cache against
	 * @param value The value to cache
	 * @param ttl The time-to-live in seconds
	 */
	public async setAsync(key: string, value: any, ttl?: number): Promise<void> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Set Skipped: ${key}`)
			return
		}

		await this.cache.set(key, value, ttl)
		this.debugLog(`Cache key set: ${key}`)
	}

	/**
	 * Get an item from the cache
	 *
	 * @param key The cache key to fetch
	 */
	public async get(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Get Skipped: ${key}`)
			return null
		}

		return this.cache.get(key)
	}

	/**
	 * Delete an item from the cache
	 *
	 * @param key The key of the item to delete
	 */
	public del(key: string): void {
		this.delAsync(key)
			.then(() => {})
			.catch(e => {
				log.warn(`Error deleting cache key: ${key}`, { err: e })
			})
	}

	/**
	 * Delete an item from the cache with the ability to wait for the operation to complete
	 *
	 * @param key The key of the item to delete
	 */
	public async delAsync(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Del Skipped: ${key}`)
			return null
		}

		return this.cache.del(key)
	}

	/**
	 * Delete any items from the cache that match the key.
	 * For example, to delete any key that starts with "mySkill" you'd
	 * set key='mySkill*'
	 *
	 * @param key The key of the item to delete
	 */
	public async delWildcard(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Delete Wildcard Skipped: ${key}`)
			return null
		}

		return this.cache.delWildcard(key)
	}

	/**
	 * Delete any items from the cache that match the key. And wait for
	 * the operation to complete.
	 * For example, to delete any key that starts with "mySkill" you'd
	 * set key='mySkill*'
	 *
	 * @param key The key of the item to delete
	 */
	public async delWildcardAsync(key: string): Promise<any> {
		if (!this.cache || !this.isEnabled) {
			this.debugLog(`Cache Delete Wildcard Skipped: ${key}`)
			return null
		}

		await this.cache.delWildcard(key)
		this.debugLog(`Wildcard cache key deleted: ${key}`)
	}

	/**
	 * Whether the cache is connected
	 */
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
		url?: string
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
