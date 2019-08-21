const globby = require('globby')
const path = require('path')

module.exports = (dir, router, options) => {
	console.log('*************************************')
	console.log('*************************************')
	const matches = globby.sync(path.join(dir, '/**/*.(js|ts)'), {
		ignore: ['**/cron.js', '**/ignore/**', '**/*test*']
	})
	console.log({ dir, matches })
	matches.forEach(function(match) {
		const controller = require(match)
		if (controller.default) {
			controller.default(router, options)
		} else {
			controller(router, options)
		}
	})
}
