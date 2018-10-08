const config = require('config')
const _ = require('lodash')
const IORedis = require('ioredis')

module.exports = {
	client: null,
	options: null,
	connected: false,

	init(options) {
		this.connected = false
		this.config = options || {}

		if (options.url && !options.disable) {
			const { url, ttl, ...opts } = options
			const client = new IORedis(url, { ...opts, keyPrefix: `${config.SLUG}:` })

			client.connect(() => this.onConnect())

			this.client = client
		}
	},

	onConnect() {
		this.connected = true
	},

	get(key) {
		return new Promise((resolve, reject) => {
			if (!this.connected) {
				log.debug(`Redis Not Connected: ${key}`)
				return resolve(null)
			}

			try {
				this.client.get(key, (err, result) => {
					if (err) {
						return reject(err)
					}
					if (result) {
						log.debug(`Redis Cache HIT: ${key}`)
						return resolve(JSON.parse(result))
					}
					log.debug(`Redis Cache MISS: ${key}`)
					return resolve(result)
				})
			} catch (e) {
				log.warn(e)
				return resolve(null)
			}
		})
	},

	set(key, val, ttl) {
		if (!this.connected) {
			log.debug(`Redis Not Connected: ${key}`)
			return null
		}
		ttl = typeof ttl !== 'undefined' ? ttl : this.config.ttl
		try {
			this.client.set(key, JSON.stringify(val))
			this.client.expire(key, ttl)
		} catch (e) {
			log.warn(e)
		}
	},

	del(key) {
		try {
			if (!this.connected) {
				log.debug(`Redis Not Connected: ${key}`)
				return null
			}
			// In case it's got the prefix (from delWildcard), remove it
			key = key.replace(`${config.SLUG}:`, '')

			log.debug(`Cache DELETE: ${key}`)
			this.client.del(key)
		} catch (e) {
			log.warn(e)
		}
	},

	delWildcard(key) {
		try {
			if (!this.connected) {
				log.debug(`Redis Cache Disabled: ${key}`)
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
