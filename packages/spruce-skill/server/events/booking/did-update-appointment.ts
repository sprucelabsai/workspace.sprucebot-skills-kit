import { eventError } from '../../lib/errorHandler'
import { ISkillEventContextV2 } from '../../interfaces/ctx'
import { SpruceEvents } from 'server/interfaces/events-generated'

export default async (
	ctx: ISkillEventContextV2<
		SpruceEvents.booking.IDidUpdateAppointmentPayload,
		SpruceEvents.booking.IDidUpdateAppointmentBody
	>,
	next: () => Promise<any>
) => {
	try {
		if (!ctx.event.payload) {
			throw new Error('MISSING_PARAMETERS')
		}

		const { id } = ctx.event.payload

		log.debug(`Appointment updated: ${id}`)

		ctx.body = { status: 'success' }
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
