module.exports = {
	cache: null,
	async init({ cache, options = {} } = {}) {
		if (cache && !options.disable) {
			this.cache = require(cache)
			this.cache.init(options)
		}
	},

	set(key, value, ttl) {
		if (!this.cache) {
			log.debug(`Cache Set Skipped: ${key}`)
			return
		}

		return this.cache.set(key, value, ttl)
	},

	async get(key) {
		if (!this.cache) {
			log.debug(`Cache Get Skipped: ${key}`)
			return null
		}

		return this.cache.get(key)
	},

	async del(key) {
		if (!this.cache) {
			log.debug(`Cache Del Skipped: ${key}`)
			return null
		}

		return this.cache.del(key)
	},

	async delWildcard(key) {
		if (!this.cache) {
			log.debug(`Cache Delete Wildcard Skipped: ${key}`)
			return null
		}

		return this.cache.delWildcard(key)
	}
}
