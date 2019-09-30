/* eslint-disable @typescript-eslint/no-var-requires */
import globby from 'globby'
import path from 'path'
import config from 'config'
import Debug from 'debug'
import get from 'ts-get'
const debug = Debug('spruce-skill-server')

export default (dir: string, key: string, ctx: any) => {
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

			const serviceConfig = get(config, config => config[key][filename], {})

			const m = require(match)
			if (m.default) {
				const service = new m.default({
					ctx,
					// @ts-ignore
					config: serviceConfig
				})
				ctx[key][filename] = service
			} else {
				if (m.init) {
					// @ts-ignore
					m.init(serviceConfig)
				}
				ctx[key][filename] = m
			}
		} catch (e) {
			log.crit(`Unable to load ${key}: ${filename}`, e)
		}
	})
}
