const debug = require('debug')('spruce-skill-server')
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
		let response = {
			// Pass back the request options so it can be validated in tests
			requestOptions: {
				path,
				data,
				query,
				method
			}
		}

		// `locations/${locationId}/emit`
		// `organizations/${organizationId}/emit`
		const isEmit = /\/emit$/.test(path)
		if (isEmit) {
			// If it's an emit, the default response is an empty array. The request options can be checked via callback
			response = []
			if (global.testEmitResponse && global.testEmitResponse[data.eventName]) {
				if (global.testEmitResponse[data.eventName].callback) {
					await global.testEmitResponse[data.eventName].callback({
						path,
						data,
						query,
						method
					})
				}

				if (global.testEmitResponse[data.eventName].data) {
					return global.testEmitResponse[data.eventName].data
				} else if (
					!global.testEmitResponse[data.eventName].data &&
					!global.testEmitResponse[data.eventName].callback
				) {
					return global.testEmitResponse[data.eventName]
				}
			} else {
				debug(`EVENT Triggered but not tested: ${data.eventName}`)
			}
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