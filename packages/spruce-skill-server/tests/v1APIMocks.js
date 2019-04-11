const config = require('config')

module.exports = ctx => ({
	async get(path, query) {
		let matches = path.match(/\/locations\/([^/]+)\/users\/([^/]+)$/)
		if (matches && matches[1] && matches[2]) {
			// ctx.sb.user() has been called. Fetch the data from the DB. Used for v1 authentication
			const locationId = matches[1]
			const userId = matches[2]
			const userLocation = await ctx.db.models.UserLocation.findOne({
				where: {
					UserId: userId,
					LocationId: locationId
				},
				include: [
					ctx.db.models.User,
					{
						model: ctx.db.models.Location,
						include: [ctx.db.models.Organization]
					}
				]
			})
			return userLocation
		}

		matches = path.match(/\/locations\/([^/]+)$/)
		if (matches && matches[1]) {
			// ctx.sb.location() has been called
			const locationId = matches[1]
			const location = await ctx.db.models.Location.findOne({
				where: {
					id: locationId
				}
			})

			return location
		}

		return Promise.resolve({})
	},
	async post(path, data, query, method) {
		const response = {}

		// `locations/${locationId}/emit`
		// `organizations/${organizationId}/emit`
		const isEmit = /\/emit$/.test(path)
		if (isEmit) {
			if (!global.testEmitResponse[data.eventName]) {
				throw new Error(
					'You must set global.testEmitResponse[eventName] as the response data when using emits in tests. Bulk emits NOT allowed.'
				)
			}

			return global.testEmitResponse[data.eventName]
		}

		return response
	},
	async patch(path, data, query) {
		return Promise.resolve({})
	},
	async delete(path, query) {
		return Promise.resolve({})
	}
})
