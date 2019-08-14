// @flow

const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx: Object, next: Function) => {
	try {
		log.debug('**** get-views', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const {
			// uncomment to access the auth
			/* auth: { User: user, Location: location, Organization: organization }, */
			event: {
				payload: { page, skillSlug /* , pageUserId */ }
			}
		}: {
			auth: { User?: Object, Location?: Object, Organization?: Object },
			event: {
				payload: {
					page: string,
					skillSlug?: string,
					pageUserId?: string,
					locationId?: string
				}
			}
		} = ctx

		const views = []
		const host = `${config.INTERFACE_HOST}`

		switch (page) {
			case 'skill_settings_org':
				if (skillSlug === config.SLUG) {
					views.push({
						id: 'uniqueId',
						title: 'Example Skill Setting',
						host,
						path: '/skill-views/skill_settings_org'
					})
				}

				break

			case 'profile_user':
				// TODO: guest and teammate profiles will differ
				// what's the best way to handle this? In the view? or profile_{role}

				views.push({
					id: 'uniqueId2',
					title: 'Example User Profile',
					host,
					path: '/user/profile/'
				})
				break
			case 'dashboard_user':
				// TODO: guest and teammate dashboards will differ
				// what's the best way to handle this? In the view? or dashboard_{role}

				views.push({
					id: 'uniqueId3',
					title: 'Example User Dashboard',
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
				views.push({
					id: 'uniqueId4',
					title: 'Example Location Dashboard',
					host,
					path: '/skill-views/dashboard_location'
				})
				break

			case 'public_org':
				// QUESTION: anything we need to change for public pages?

				views.push({
					id: 'uniqueId5',
					title: 'Example Public Org',
					host,
					path: '/o/' // TODO: any reason to append the org here?
				})
				break
			case 'public_location':
				// QUESTION: anything we need to change for public pages?

				views.push({
					id: 'uniqueId6',
					title: 'Example Public Location',
					host,
					path: '/l/' // TODO: any reason to append the location here?
				})
				break
			default:
				views.push({
					id: 'uniqueId7',
					title: 'Example Page',
					host,
					path: '/skill-views/example'
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
