import * as moment from 'moment'
import Dinero from 'dinero.js'

import { ICoreLocation } from '@sprucelabs/spruce-types'

export default {
	lang: {},
	overrides: {},
	async configure(langDir: string) {
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
	},
	/** Converts a numnber of cents into a formatted currency string. Ex: "$23.99" */
	friendlyCurrency(cents: number, location: ICoreLocation): string {
		/* TODO: Use these props once added to Location
		const currency: string = location.currecy || 'USD'
		const locale: string = location.locale || 'en-US'
		const precision: number = location.currencyMinorUnits || 2
		*/
		console.log('Location passed to friendlyCurrency: ', location.id)
		const currency = 'USD'
		const locale = 'en-US'
		const precision = 2
		const friendlyCurrency = Dinero({ amount: cents, precision, currency })
			.setLocale(locale)
			.toFormat('$0,0.00')
			.replace('.00', '')
		return friendlyCurrency
	},
	/** Returns a duration string of largest time increments from numer of seconds. Ex: `friendlyDuration(3452626, 2)` returns "1mo 8d" */
	friendlyDuration(seconds: number, location: ICoreLocation): string {
		interface IDuration {
			value: number
			label: string
		}
		console.log('Location passed to friendlyDuration: ', location.id)
		// TODO: Pull these off of location
		const largest = 2
		const showSeconds = false
		// ----
		const secondsDuration = moment.duration(seconds, 'seconds')
		const years = {
			value: secondsDuration.years(),
			label: this.getDurationLabel('yr')
		}
		const months = {
			value: secondsDuration.months(),
			label: this.getDurationLabel('mo')
		}
		const days = {
			value: secondsDuration.days(),
			label: this.getDurationLabel('d')
		}
		const hours = {
			value: secondsDuration.hours(),
			label: this.getDurationLabel('hr')
		}
		const minutes = {
			value: secondsDuration.minutes(),
			label: this.getDurationLabel('min')
		}
		const allDurations: IDuration[] = [years, months, days, hours, minutes]
		if (showSeconds) {
			allDurations.push({
				value: secondsDuration.seconds(),
				label: this.getDurationLabel('sec')
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
			if (durationCount === largest) {
				break
			}
		}
		return friendlyDuration
	},
	getDurationLabel(label: string): string {
		try {
			return this.getText(label)
		} catch {
			return label
		}
	}
}
