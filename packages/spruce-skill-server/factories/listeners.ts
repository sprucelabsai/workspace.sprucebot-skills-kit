import glob from 'glob'
import path from 'path'
import { camelCase } from 'lodash'

export default (dir: string) => {
	const matches = glob.sync(path.join(dir, '/**/*.js'), {
		ignore: ['**/ignore/**', '**/*test*']
	})

	return matches.reduce((ctx: Record<string, any>, match: string) => {
		require(match)
		let shortName = match.replace(dir, '').replace(path.extname(match), '')
		if (shortName[0] === path.sep) {
			shortName = shortName.substr(1)
		}
		let eventName: string | undefined
		// swap path separators for colons
		if (shortName.search(path.sep) > -1) {
			// custom event
			eventName = shortName.replace(/[\/\\]/gi, ':')
			ctx[eventName] = require(match)
		} else {
			// coe events are camel case because I DON'T KNOW
			eventName = camelCase(shortName)
			ctx[eventName] = ctx[shortName] = require(match)
		}

		return ctx
	}, {})
}
