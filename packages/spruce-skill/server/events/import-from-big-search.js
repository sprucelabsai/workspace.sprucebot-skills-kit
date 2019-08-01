// @flow
const { eventError } = require('../lib/errorHandler')

const { IBigSearchSection, IBigSearchResult } = require('../types')

module.exports = async (ctx: IBigSearchCtx, next) => {
	try {
		console.log('****big-search', ctx.auth.Organization.name)

		const {
			auth: { Organization: organization, Location: location },
			event: {
				payload: { limit, offset, search, testing }
			}
		} = ctx

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
