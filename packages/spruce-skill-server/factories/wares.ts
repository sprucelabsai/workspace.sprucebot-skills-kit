/* eslint-disable @typescript-eslint/no-var-requires */
import globby from 'globby'
import path from 'path'
import * as Router from 'koa-router'

export default (dir: string, router: Router, options: Record<string, any>) => {
	const matches = globby.sync(path.join(dir, '/**/*.(js|ts)'), {
		ignore: ['**/ignore/**', '**/*test*', '**/*.d.ts']
	})
	matches.forEach(match => {
		try {
			const ware = require(match)
			if (ware.default) {
				ware.default(router, options)
			} else {
				ware(router, options)
			}
		} catch (e) {
			log.crit(`Unable to import ware: ${match}`)
		}
	})
}
