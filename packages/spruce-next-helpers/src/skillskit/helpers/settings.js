import gqlClient from './gqlClient'
import gql from 'graphql-tag'

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

		const result = await gqlClient.query({
			token: this.token,
			query: gql`
				query GetSettings($requestedSettings: [String]) {
					Settings(requestedSettings: $requestedSettings) {
						settings
					}
				}
			`,
			variables: {
				requestedSettings
			}
		})

		return result &&
			result.data &&
			result.data.Settings &&
			result.data.Settings.settings
			? result.data.Settings.settings
			: {}
	}
}
