/** Returns a string of hours and minutes. Ex: "4hr 30 min" */
export const friendlyDuration = (seconds: number, lang?: any): string => {
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const hrString: string | undefined = lang && lang.getText('hr')
	const minString: string | undefined = lang && lang.getText('min')
	let duration = ''
	if (hours > 0) {
		duration += `${hours}${hrString || 'hr'}`
	}
	const remainingMin = minutes % 60
	if (remainingMin !== 0) {
		if (duration.length > 0) {
			duration += ' '
		}
		duration += `${remainingMin}${minString || 'min'}`
	}
	return duration
}

/** Converts a numnber of US cents into a formatted currency string. US Dollars by default. Ex: "$23.99" */
export const friendlyCurrency = (
	usCents: number,
	locale?: string,
	currency?: string
): string => {
	const usDollars = usCents / 100
	const friendlyCurrency = usDollars
		.toLocaleString(locale || 'en-US', {
			style: 'currency',
			currency: currency || 'USD'
		})
		.replace('.00', '')
	return friendlyCurrency
}
