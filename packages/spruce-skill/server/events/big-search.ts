import eventError from '../lib/errorHandler'
import {
	ISpruceBigSearchPayload,
	ISpruceBigSearchBody,
	ISpruceBigSearchSection
} from '@sprucelabs/spruce-skill-server'
import { SpruceBigSearchType } from '@sprucelabs/spruce-skill-server'
import get from 'ts-get'
import { ISkillEventContextV2 } from '../interfaces/ctx'
import { ICoreGQLBigSearchResultsRecordActionType } from '@sprucelabs/spruce-types'

module.exports = async (
	ctx: ISkillEventContextV2<ISpruceBigSearchPayload, ISpruceBigSearchBody>,
	next: () => Promise<any>
) => {
	try {
		if (!ctx.auth) {
			return next()
		}

		const {
			auth: { Organization: organization, Location: location },
			event: {
				payload: { limit, offset, search, testing, types }
			}
		} = ctx

		console.log('****big-search', get(organization, o => o.name, 'No org set'))

		// each section
		const sections: ISpruceBigSearchSection[] = []

		// do whatever you want with these
		console.log('ignoring', search, testing)

		// Here is how you could search the core using any rules if types was any or user
		if (
			types.indexOf(SpruceBigSearchType.Any) > -1 ||
			types.indexOf(SpruceBigSearchType.User) > -1
		) {
			const { count, rows } = await ctx.db.models.User.findAndCountAll({
				// where: {
				// 	firstName: 'Foo',
				// 	lastName: 'Bar'
				// }
				limit,
				offset
			})

			const section1: ISpruceBigSearchSection = {
				title: 'Core Search Results Example',
				section: 'internal',
				totalCount: count,
				results: rows.map(user => ({
					id: user.id,
					title: `${user.firstName} ${user.lastName}`,
					subtitle: ``,
					action: {
						type: ICoreGQLBigSearchResultsRecordActionType.CoreRedirect,
						page: location ? 'profile_user_location' : 'profile_user_org',
						routeParams: {
							userId: user.id,
							organizationId: organization && organization.id,
							locationId: location && location.id
						}
					}
				}))
			}

			sections.push(section1)
		}

		// or you can search any source you want and mark them as needing to be imported
		// you can't import people unless there is a location, so make sure to check one is set
		if (location) {
			const dummyResults = []

			for (let c = 0; c < 100; c++) {
				dummyResults.push({
					id: `${c}`,
					title: `Dummy User ${c}`,
					subtitle: `I am #${c}`,
					action: {
						type: ICoreGQLBigSearchResultsRecordActionType.Import
					}
				})
			}

			const section2 = {
				title: 'Results to import',
				section: 'external',
				totalCount: dummyResults.length,
				results: dummyResults.slice(offset, offset + limit)
			}

			sections.push(section2)
		}

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
