const globby = require('globby')
const path = require('path')
const config = require('config')
const debug = require('debug')('spruce-skill-server')

module.exports = (dir, key, ctx) => {
	if (!ctx[key]) {
		ctx[key] = {}
	}
	const matches = globby.sync(path.join(dir, '/*.(js|ts)'), {
		ignore: ['**/ignore/**', '**/*test*', '**/*.d.ts']
	})
	matches.forEach(match => {
		let filename = path.basename(match, path.extname(match))
		try {
			filename = `${filename.charAt(0).toLowerCase()}${filename.slice(1)}`
			debug(`Loading ${key}: ${filename}`)
			const m = require(match)
			if (m.default) {
				const service = new m.default({
					ctx,
					config: config[key] && config[key][filename]
				})
				ctx[key][filename] = service
			} else {
				if (m.init) {
					m.init(config[key] && config[key][filename])
				}
				ctx[key][filename] = m
			}
		} catch (e) {
			log.crit(`Unable to load ${key}: ${filename}`, e)
		}
	})
}
