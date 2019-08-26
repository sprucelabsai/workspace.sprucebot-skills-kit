import config from 'config'
import { AbstractSpruceSkillCacheAdapter } from '../Cache'

export default class Memory implements AbstractSpruceSkillCacheAdapter {
	private cache: Record<string, any> = {}

	public constructor(options: {
		url?: string
		defaultTTL?: number
		isDisabled?: boolean
		keyPrefix?: string
	}) {
		this.init(options)
	}

	public init(options: {
		url?: string
		defaultTTL?: number
		isDisabled?: boolean
		keyPrefix?: string
	}): void {
		log.debug('Memory cache init', { options })
		if (!config.get<boolean>('TESTING')) {
			throw new Error('Memory cache should only be used for testing')
		}
	}

	public async get(key: string): Promise<Record<string, any> | void> {
		return this.cache[key]
	}

	public async set(key: string, val: any): Promise<void> {
		this.cache[key] = val
	}

	public async del(key: string): Promise<number> {
		if (this.cache[key]) {
			delete this.cache[key]
			return 1
		}
		return 0
	}

	public async delWildcard(key: string): Promise<void> {
		const keyRegex = this.wildcardKeyToRegex(key)
		const keys = Object.keys(this.cache).filter(k => keyRegex.test(k))
		keys.forEach(k => {
			delete this.cache[k]
		})
	}

	public isConnected(): boolean {
		return true
	}

	private wildcardKeyToRegex(key: string): RegExp {
		const adjustedKey = key.replace(/\*/, '.*')
		const regex = new RegExp(adjustedKey)
		return regex
	}
}
