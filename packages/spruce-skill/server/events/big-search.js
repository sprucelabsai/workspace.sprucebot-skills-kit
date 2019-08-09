// @flow
const { eventError } = require('../lib/errorHandler')

import type {
	IBigSearchCtx,
	IBigSearchSection,
	IBigSearchResult
} from '../types'

const BIG_SEARCH_TYPES = {
	ANY: 'any',
	USER: 'user',
	LOCATION: 'location',
	GROUP: 'group'
}

module.exports = async (ctx: IBigSearchCtx, next: Function) => {
	try {
		console.log('****big-search', ctx.auth.Organization.name)

		const {
			auth: { Organization: organization, Location: location },
			event: {
				payload: { limit, offset, search, testing, types }
			}
		} = ctx

		// each section
		const sections: IBigSearchSection[] = []

		// do whatever you want with these
		console.log('ignoring', search, testing)

		// Here is how you could search the core using any rules if types was any or user
		if (
			types.indexOf(BIG_SEARCH_TYPES.ANY) > -1 ||
			types.indexOf(BIG_SEARCH_TYPES.USER) > -1
		) {
			const { count, rows } = await ctx.db.models.User.findAndCountAll({
				// where: {
				// 	firstName: 'Foo',
				// 	lastName: 'Bar'
				// }
				limit,
				offset
			})

			const section1: IBigSearchSection = {
				title: 'Core Search Results Example',
				section: 'internal',
				totalCount: count,
				results: rows.map(
					(user: Object): IBigSearchResult => ({
						id: user.id,
						title: `${user.firstName} ${user.lastName}`,
						subtitle: ``,
						action: {
							type: 'coreRedirect',
							page: location ? 'profile_user_location' : 'profile_user_org',
							routeParams: {
								userId: user.id,
								organizationId: organization.id,
								locationId: location && location.Id
							}
						}
					})
				)
			}

			sections.push(section1)
		}

		// or you can search any source you want and mark them as needing to be imported
		const dummyResults: IBigSearchResult[] = []

		for (let c = 0; c < 100; c++) {
			dummyResults.push({
				id: c,
				title: `Dummy User ${c}`,
				subtitle: `I am #${c}`,
				action: {
					type: 'import'
				}
			})
		}

		const section2: IBigSearchSection = {
			title: 'Results to import',
			section: 'external',
			totalCount: dummyResults.length,
			results: dummyResults.slice(offset, offset + limit)
		}

		sections.push(section2)

		ctx.body = sections

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
