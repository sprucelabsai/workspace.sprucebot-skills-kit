import {
	IHWButton,
	IHWCalendarEventDetailsItem,
	IHWUiEnhancementSection
} from '@sprucelabs/spruce-types'
import { cloneDeep, compact, concat, each, find } from 'lodash'
import { IEventDetailsItemProps } from './components/EventDetailsItem/EventDetailsItem'
import { IButtonProps } from '../Button/Button'

type TValidEventDetails =
	| IHWCalendarEventDetailsItem[]
	| IEventDetailsItemProps[]

/** This utility is used in conjunction with the `getUIEnhancements` endpoint.
 *  With it, you can meld the results of that API with an existing eventDetailsItems
 *  response, which you may have retrieved from `CalendarEvents`, or otherwise
 *  may be assembling manually.
 */
export function applyUIEnhancementsToEventDetails(
	eventDetailItems: TValidEventDetails,
	UIEnhancementSections: IHWUiEnhancementSection[]
) {
	// First, we clone the input to keep the method pure and avoid side-effects.
	const mutatedEventDetailItems = cloneDeep(eventDetailItems)

	// This loop applies the `contextMenuItems` enhancements to the appropriate
	// context menus in the event details.
	each(mutatedEventDetailItems, eventDetailItem => {
		if (
			eventDetailItem &&
			typeof eventDetailItem === 'object' &&
			eventDetailItem.viewModel.__typename === 'List'
		) {
			eventDetailItem.viewModel.items &&
				eventDetailItem.viewModel.items.forEach(item => {
					const matchingUIEnhancement = find(UIEnhancementSections, {
						id: eventDetailItem.id || undefined
					})

					if (
						matchingUIEnhancement &&
						item.__typename === 'ListItem' &&
						item.contextMenu
					) {
						item.contextMenu.actions = concat<IHWButton | IButtonProps>(
							item.contextMenu.actions,
							compact(matchingUIEnhancement.contextMenuItems)
						)
					}
				})
		}
	})

	// At this stage we interleave the new `calendarEventDetailsItems` enhancements with
	// the inputs'.
	let mutatedEventDetailItemsWithAdditionalEventDetailItems: any = []

	each(mutatedEventDetailItems, eventDetailItem => {
		mutatedEventDetailItemsWithAdditionalEventDetailItems.push(eventDetailItem)

		if (eventDetailItem && typeof eventDetailItem === 'object') {
			const matchingUIEnhancement = find(UIEnhancementSections, {
				id: eventDetailItem.id || undefined
			})

			if (
				matchingUIEnhancement &&
				matchingUIEnhancement.calendarEventDetailsItems
			) {
				mutatedEventDetailItemsWithAdditionalEventDetailItems = mutatedEventDetailItemsWithAdditionalEventDetailItems.concat(
					matchingUIEnhancement.calendarEventDetailsItems
				)
			}
		}
	})

	// And done! Have a nice day!
	return mutatedEventDetailItemsWithAdditionalEventDetailItems
}
