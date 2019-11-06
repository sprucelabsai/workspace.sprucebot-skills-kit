import { eventError } from '../lib/errorHandler'
import { ISkillEventContextV2 } from '../interfaces/ctx'
import {
	IEventGetUIEnhancementsBody,
	IEventGetUIEnhancementsPayload,
	IUIEnhancementSection,
	IHWCalendarEventDetailsItemType
} from '@sprucelabs/spruce-types'

export default async (
	ctx: ISkillEventContextV2<
		IEventGetUIEnhancementsPayload,
		IEventGetUIEnhancementsBody
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
