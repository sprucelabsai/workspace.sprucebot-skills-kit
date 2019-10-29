import config from 'config'
import gql from 'graphql-tag'
import { IGQLResolvers } from '../../../../interfaces/gql'
import { ISpruceContext } from '../../../../interfaces/ctx'
import { Source } from 'graphql'
import { Organization } from '../../../../models/Organization'
import { Location } from '../../../../models/Location'
import { IHWButtonKinds } from '@sprucelabs/spruce-types'

export default (ctx: ISpruceContext) => {
	if (!config.UI_ENHANCEMENTS_ENABLED) {
		log.debug('UI_Enhancements GQL endpoint is disabled')
		return {}
	}

	const uiEnhancements: IGQLResolvers<ISpruceContext> = {
		sdl: gql`
			extend type Query {
				"Get UI enhancements for a section"
				getUIEnhancements(
					sections: [String!]
					view: String!
					organizationId: ID
					locationId: ID
					payload: JSON
				): GetUIEnhancementsResponse
			}
		`,
		resolvers: {
			CalendarEventDetailsItemViewModel: {
				__resolveType: (result: any) => {
					// determine type of field

					// a list or card builder
					if (result.items) {
						//things unique to cardbuilder
						if (result.headerImage || result.onboarding || result.body) {
							return 'CardBuilder'
						}

						return 'List'
					}

					// split button
					if (result.defaultAction) {
						return 'SplitButton'
					}

					// an action
					if (
						(result.kind &&
							Object.values(IHWButtonKinds).includes(result.kind)) ||
						result.icon
					) {
						return 'Button'
					}

					// toast
					if (result.headline) {
						return 'Toast'
					}

					// text
					if (result.text) {
						return 'Text'
					}

					// markdown
					if (result.source) {
						return 'Markdown'
					}

					// card builder
					if (result.body) {
						return 'CardBuilder'
					}

					// not sure what to do if we can't find a match
					return 'Text'
				}
			},
			Query: {
				getUIEnhancements: async (
					source: Source,
					args: {
						sections: string[]
						view: string
						organizationId?: string | null
						locationId?: string | null
						payload?: Record<string, any> | null
					},
					context: ISpruceContext
				) => {
					if (!context.auth || !context.auth.User) {
						throw new Error('USER_NOT_LOGGED_IN')
					}

					const {
						view,
						locationId,
						organizationId,
						payload,
						sections: requestedSections
					} = args

					let sections: Record<string, any>[] = []

					if (!locationId || !organizationId) {
						throw new Error('MISSING_PARAMETERS')
					}

					const [organization, location]: [
						Organization | null,
						Location | null
					] = await Promise.all([
						ctx.db.models.Organization.findOne({
							where: {
								id: organizationId
							}
						}),
						ctx.db.models.Location.findOne({
							where: {
								id: locationId
							}
						})
					])

					if (!location) {
						throw new Error('LOCATION_NOT_FOUND')
					}

					if (
						location &&
						organization &&
						location.OrganizationId !== organization.id
					) {
						throw new Error('LOCATION_ORGANIZATION_MISMATCH')
					}

					const responses = await ctx.sb.emit(
						location.id,
						'get-ui-enhancements',
						{
							view,
							sections: requestedSections,
							...payload
						},
						{
							loggedInUserId: context.auth.User.id
						}
					)

					const response = responses && responses[0]

					if (response && response.payload) {
						sections = response.payload.sections
					}

					return { sections }
				}
			}
		}
	}

	return uiEnhancements
}
