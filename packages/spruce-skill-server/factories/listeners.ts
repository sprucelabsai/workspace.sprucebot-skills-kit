/* eslint-disable @typescript-eslint/no-var-requires */
import globby from 'globby'
import path from 'path'
import { camelCase } from 'lodash'

export default (dir: string) => {
	const matches = globby.sync(path.join(dir, '/**/*.(js|ts)'), {
		ignore: ['**/ignore/**', '**/*test*', '**/*.d.ts']
	})

	return matches.reduce((ctx: Record<string, any>, match: string) => {
		// require(match)
		let shortName = match.replace(dir, '').replace(path.extname(match), '')
		if (shortName[0] === path.sep) {
			shortName = shortName.substr(1)
		}
		let eventName: string | undefined
		// swap path separators for colons
		const importedListener = require(match)
		let listener
		if (importedListener.default) {
			listener = importedListener.default
		} else {
			listener = importedListener
		}
		if (shortName.search(path.sep) > -1) {
			// custom event
			eventName = shortName.replace(/[/\\]/gi, ':')
			ctx[eventName] = listener
		} else {
			// coe events are camel case because I DON'T KNOW
			eventName = camelCase(shortName)
			ctx[eventName] = ctx[shortName] = listener
		}

		return ctx
	}, {})
}
