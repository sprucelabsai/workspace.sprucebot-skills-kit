const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** get-views', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const views = []
		const title = 'Example'
		const host = `${config.INTERFACE_HOST}`

		switch (ctx.event.payload.page) {
			case 'profile_user':
				// TODO: guest and teammate profiles will differ
				// what's the best way to handle this? In the view? or profile_{role}

				views.push({
					title,
					host,
					path: '/user/profile/'
				})
				break
			case 'dashboard_user':
				// TODO: guest and teammate dashboards will differ
				// what's the best way to handle this? In the view? or dashboard_{role}

				views.push({
					title,
					host,
					path: '/user/dashboard/'
				})
				break
			case 'dashboard_location':
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
					id: 'dashboard_location',
					title,
					host,
					path: '/skill-views/location_dashboard'
				})
				break
			case 'location_settings':
				views.push({
					title,
					host,
					path: '/location/settings/'
				})
				break
			case 'public_org':
				// QUESTION: anything we need to change for public pages?

				views.push({
					title,
					host,
					path: '/o/' // QUESTION: any reason to append the org here?
				})
				break
			case 'public_location':
				// QUESTION: anything we need to change for public pages?

				views.push({
					title,
					host,
					path: '/l/' // QUESTION: any reason to append the location here?
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
