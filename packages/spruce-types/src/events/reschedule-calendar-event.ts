import { ISpruceEventWarning } from '../events'
import { IHWCalendarEvent } from '../generated/hw-gql'

export interface ICoreRescheduleCalendarEventPayloadBlock {
	/** The block id */
	id: string

	/** The new block duration in seconds */
	durationSec: number
}

/** 🌲🤖 Core event "reschedule-calendar-event" payload */
export interface ICoreRescheduleCalendarEventPayload {
	/** The event id. This will be in the format <slug>:<eventId> */
	id: string

	/** The new starting time for the event */
	newStartAt?: string

	/** Reschedule individual blocks in the calendar event */
	blockUpdates?: ICoreRescheduleCalendarEventPayloadBlock[]

	/** Change the user who "owns" the event */
	newUserId?: string

	/** The id of the user who is trying to reschedule the calendar event */
	loggedInUserId?: string
}

/** 🌲🤖 Core event "reschedule-calendar-event" expected response on ctx.body */
export interface ICoreRescheduleCalendarEventEventBody {
	/** Whether the operation succeeded or failed */
	status: 'success' | 'failure'

	/** The calendar events to update */
	updateCalendarEvents?: IHWCalendarEvent[]

	/** The calendar events to add */
	addCalendarEvents?: IHWCalendarEvent[]

	/** The calendar event ids to remove */
	removeCalendarEventIds?: string[]

	/** Warnings about the reschedule operation */
	warnings?: ISpruceEventWarning[]
}
