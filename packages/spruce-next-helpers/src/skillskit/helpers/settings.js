import gqlClient from './gqlClient'

export default {
	configure(token) {
		this.token = token
	},
	// TODO: Cache settings?
	async get(options) {
		let requestedSettings = []
		if (typeof options === 'string') {
			requestedSettings = [options]
		} else if (Array.isArray(options)) {
			requestedSettings = options
		}
		const strRequestedSettings = requestedSettings.map(s => `"${s}"`)
		const result = await gqlClient.query({
			token: this.token,
			query: `{
				Settings (requestedSettings: [${strRequestedSettings.join(',')}]) {
					settings
				}
			}`
		})

		return result &&
			result.data &&
			result.data.Settings &&
			result.data.Settings.settings
			? result.data.Settings.settings
			: {}
	}
}
