import { eventError } from '../lib/errorHandler'
import { ISkillEventContextV2 } from '../interfaces/ctx'
import {
	IHWCalendarEventDetailsItemType,
	IHWCalendarEventDetailsItem,
	IHWAction
} from '@sprucelabs/spruce-types'
import { SpruceEvents } from 'server/interfaces/events-generated'

interface IUIEnhancementSection {
	/** The section id for this enhancement */
	id: string
	/** Event detail items to place in this section */
	eventDetailsItems?: IHWCalendarEventDetailsItem[]
	/** Actions that should be added to the context menu of this section */
	actions?: IHWAction[]
}

export default async (
	ctx: ISkillEventContextV2<
		SpruceEvents.core.IGetUiEnhancementsPayload,
		SpruceEvents.core.IGetUiEnhancementsBody
	>,
	next: () => Promise<any>
) => {
	try {
		if (!ctx.event.payload) {
			throw new Error('MISSING_PARAMETERS')
		}

		const sections: IUIEnhancementSection[] = []

		const { view, ...payload } = ctx.event.payload

		switch (view) {
			case 'example-enhancement':
				if (payload.guestId) {
					log.debug(`Found guestId on the payload: ${payload.guestId}`)
				}
				sections.push({
					id: 'my-unique-id',
					eventDetailsItems: [
						{
							type: IHWCalendarEventDetailsItemType.Text,
							viewModel: {
								id: 'my-unique-id-text',
								text: 'This text will show up as a UI enhancement!'
							}
						}
					]
				})
				break

			default:
				log.debug(`get-ui-enhancements did not find match for view: ${view}`)
				break
		}

		ctx.body = { sections }
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
