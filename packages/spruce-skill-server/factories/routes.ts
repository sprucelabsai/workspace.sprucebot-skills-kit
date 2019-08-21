/* eslint-disable @typescript-eslint/no-var-requires */
import globby from 'globby'
import path from 'path'
import * as Router from 'koa-router'
import Debug from 'debug'
const debug = Debug('spruce-skill-server')

export default (dir: string, router: Router, options?: Record<string, any>) => {
	const matches = globby.sync(path.join(dir, '/**/*.(js|ts)'), {
		ignore: ['**/cron.js', '**/ignore/**', '**/*test*']
	})
	debug('Found controllers', matches)
	matches.forEach(function(match) {
		// @ts-ignore
		const controller = require(match)
		try {
			if (controller.default) {
				debug(`Loading controller`)
				controller.default(router, options)
			} else {
				controller(router, options)
			}
		} catch (e) {
			log.crit(`Unable to load controller: ${match}`)
		}
	})
}
