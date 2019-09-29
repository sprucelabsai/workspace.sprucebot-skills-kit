import * as moment from 'moment'
import Dinero from 'dinero.js'

export default {
	lang: {},
	overrides: {},
	configure(langDir) {
		this.lang = require(`${langDir}/default.js`)
		try {
			this.overrides = require(`${langDir}/overrides.js`)
		} catch (err) {
			console.info('No lang override specified.')
		}
	},
	mixin(lang, overrides) {
		this.lang = lang
		this.overrides = overrides
	},
	getText(key, context = {}) {
		const translations = {
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
	},
	/** Converts a numnber of cents into a formatted currency string. Ex: "$23.99" */
	friendlyCurrency: cents => {
		/*
    TODO:
    const { currency, locale } = this.ctx.location
    */
		const currency = 'USD'
		const locale = 'en-US'
		const friendlyCurrency = Dinero({ amount: cents, precision: 2, currency })
			.setLocale(locale)
			.toFormat('$0,0.00')
			.replace('.00', '')
		return friendlyCurrency
	},

	/** Returns a duration string of largest time increments from numer of seconds. Ex: `friendlyDuration(3452626, 2)` returns "1mo 8d" */
	friendlyDuration(seconds, largest, showSeconds) {
		const getDurationLabel = label => {
			try {
				return this.getText(label)
			} catch {
				return label
			}
		}
		const secondsDuration = moment.duration(seconds, 'seconds')
		const years = {
			value: secondsDuration.years(),
			label: getDurationLabel('yr')
		}
		const months = {
			value: secondsDuration.months(),
			label: getDurationLabel('mo')
		}
		const days = {
			value: secondsDuration.days(),
			label: getDurationLabel('d')
		}
		const hours = {
			value: secondsDuration.hours(),
			label: getDurationLabel('hr')
		}
		const minutes = {
			value: secondsDuration.minutes(),
			label: getDurationLabel('min')
		}
		let allDurations = [years, months, days, hours, minutes]
		if (showSeconds) {
			allDurations.push({
				value: secondsDuration.seconds(),
				label: getDurationLabel('sec')
			})
		}
		let durationCount = 0
		let friendlyDuration = ''
		for (let i = 0; i < allDurations.length; i++) {
			const duration = allDurations[i]
			if (i !== allDurations.length - 1 && duration.value === 0) {
				continue
			}
			friendlyDuration += `${durationCount ? ' ' : ''}${duration.value}${
				duration.label
			}`
			durationCount++
			if (durationCount === (largest || 2)) {
				break
			}
		}
		return friendlyDuration
	}
}
