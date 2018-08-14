const IORedis = require('ioredis')
const config = require('config')
const _ = require('lodash')

module.exports = class Redis {
	constructor(configOptions) {
		this.connected = false
		this.config = configOptions || {}
		if (!config.REDIS_DISABLE) {
			this.init()
		}
	}
	init() {
		if (!config.REDIS_URL) {
			log.warn('REDIS_URL not set.  Redis not initialized')
			return
		}
		const opts = this.config.options ? this.config.options : {}
		opts.keyPrefix = `${config.SLUG}:`
		const client = new IORedis(config.REDIS_URL, opts)
		client.connect(() => this.onConnect())
		this.client = client
	}

	onConnect() {
		this.connected = true
	}

	get(key) {
		return new Promise((resolve, reject) => {
			if (config.REDIS_DISABLE || !this.connected) {
				log.debug(`Cache Disabled: ${key}`)
				return resolve(null)
			}
			try {
				this.client.get(key, (err, result) => {
					if (err) {
						return reject(err)
					}
					if (result) {
						log.debug(`Cache HIT: ${key}`)
						return resolve(JSON.parse(result))
					}
					log.debug(`Cache MISS: ${key}`)
					return resolve(result)
				})
			} catch (e) {
				log.warn(e)
				return resolve(null)
			}
		})
	}

	set(key, val, ttl) {
		if (config.REDIS_DISABLE || !this.connected) {
			log.debug(`Cache Disabled: ${key}`)
			return null
		}
		ttl = typeof ttl !== 'undefined' ? ttl : config.REDIS_DEFAULT_TTL_SEC
		try {
			this.client.set(key, JSON.stringify(val))
			this.client.expire(key, ttl)
		} catch (e) {
			log.warn(e)
		}
	}

	del(key) {
		try {
			if (config.REDIS_DISABLE || !this.connected) {
				log.debug(`Cache Disabled: ${key}`)
				return null
			}
			log.debug(`Cache DELETE: ${key}`)
			this.client.del(key)
		} catch (e) {
			log.warn(e)
		}
	}

	delWildcard(key) {
		try {
			if (config.REDIS_DISABLE || !this.connected) {
				log.debug(`Cache Disabled: ${key}`)
				return null
			}
			log.debug(`Cache DELETE: ${key}`)
			this.client.keys(`${config.SLUG}:${key}`, (err, rows) => {
				if (err) {
					log.warn(err)
					return
				}
				rows.forEach(row => {
					this.del(row)
				})
			})
		} catch (e) {
			log.warn(e)
		}
	}
}
