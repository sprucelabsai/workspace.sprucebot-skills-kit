const glob = require('glob')
const path = require('path')

module.exports = (dir, router) => {
	const matches = glob.sync(path.join(dir, '/**/*.js'))
	matches.forEach(match => {
		const ware = require(match)
		ware(router)
	})
}
