import { IGQLResolvers } from '../../interfaces/gql'
import { ISpruceContext } from '../../interfaces/ctx'

import { IHWButtonKinds } from '@sprucelabs/spruce-types'

export default () => {
	const typeResolvers: IGQLResolvers<ISpruceContext> = {
		resolvers: {
			Action: {
				__resolveType: (result: any) => {
					return `Action${result.type}`
				}
			},
			CardBuilderBodyItemViewModel: {
				__resolveType: (result: any) => {
					// list
					if (result.items) {
						return 'List'
					}

					// a button
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

					if (result.defaultAction) {
						return 'SplitButton'
					}

					if (result.scores) {
						return 'ScoreCard'
					}

					return 'Text'
				}
			},
			ListItemTypes: {
				__resolveType: (result: any) => {
					// can be ListItem or ExpandableListItem
					if (result && result.item) {
						return 'ExpandableListItem'
					}

					return 'ListItem'
				}
			},
			ListItemSelectablePropsType: {
				__resolveType: (result: any) => {
					// is checked is required, either true or false
					if (typeof result.isIndeterminate === 'boolean') {
						return 'Checkbox'
					}

					return 'Radio'
				}
			},
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
			}
		}
	}

	return typeResolvers
}
