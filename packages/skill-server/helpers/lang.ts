import Debug from 'debug'

const debug = Debug('spruce-skill-server')

export default {
	lang: {},
	overrides: {},
	async configure(langDir: string) {
		try {
			this.lang = require(`${langDir}/default.js`)
		} catch (e) {
			debug('No default lang file found')
		}
		try {
			this.overrides = require(`${langDir}/overrides.js`)
		} catch (err) {
			debug('No lang override specified.')
		}
	},
	getText(key: string, context: Record<string, any> = {}) {
		const translations: Record<string, any> = {
			...this.lang,
			...this.overrides,
			...context
		}
		if (translations[key]) {
			return typeof translations[key] === 'function'
				? translations[key](translations)
				: translations[key]
		}

		throw Error(`Translation missing key ${key}`)
	}
}
