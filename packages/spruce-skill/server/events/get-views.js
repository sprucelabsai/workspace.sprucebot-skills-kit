const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** get-views', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const views = []

		switch (ctx.event.payload.page) {
			case 'location_dashboard':
				if (
					!ctx.event.payload.locationId ||
					!ctx.event.payload.organizationId
				) {
					throw new Error('MISSING_PARAMETERS')
				}
				const showPage = await ctx.services.acl.userIsAuthorizedForAcls({
					userId: ctx.event.payload.userId,
					locationId: ctx.event.payload.locationId,
					organizationId: ctx.event.payload.organizationId,
					permissions: {
						core: ['can_manage_organization']
					}
				})
				views.push({
					title: 'My skill',
					url: `${config.INTERFACE_HOST}/location-dashboard`
				})
				break
			case 'marketing':
				views.push({
					title: 'My skill',
					url: `${config.INTERFACE_HOST}/marketing`
				})
				break
		}

		ctx.body = views

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
