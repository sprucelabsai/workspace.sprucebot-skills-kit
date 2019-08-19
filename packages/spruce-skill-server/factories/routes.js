const glob = require('glob')
const path = require('path')

module.exports = (dir, router, options) => {
	const matches = glob.sync(path.join(dir, '/**/*.js'), {
		ignore: ['**/cron.js', '**/ignore/**', '**/*test*']
	})
	matches.forEach(function(match) {
		console.log({ match })
		const controller = require(match)
		console.log({ controller })
		controller(router, options)
	})
}
