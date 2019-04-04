const config = require('config')

module.exports = ctx => ({
	async get(path, query) {
		const matches = path.match(/\/locations\/([^/]+)\/users\/([^/]+)/)
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
		return Promise.resolve({})
	},
	async post(path, data, query, method) {
		return Promise.resolve({})
	},
	async patch(path, data, query) {
		return Promise.resolve({})
	},
	async delete(path, query) {
		return Promise.resolve({})
	}
})
