import glob from 'glob'
import path from 'path'
import * as Router from 'koa-router'

export default (dir: string, router: Router, options: Record<string, any>) => {
	const matches = glob.sync(path.join(dir, '/**/*.js'), {
		ignore: ['**/ignore/**', '**/*test*']
	})
	matches.forEach(match => {
		const ware = require(match)
		ware(router, options)
	})
}
