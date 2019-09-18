import { ISpruceEvent, ISpruceEventWarning } from '../events'
import { ICoreGQLCalendarEvent } from '../generated/api-gql'
import { Organization, Location, User } from '@sprucelabs/spruce-skill-server'

export interface ICoreRescheduleCalendarEventPayloadBlock {
	/** The block id */
	id: string
	/** The new block duration in seconds */
	durationSec: number
}

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

export interface ICoreRescheduleCalendarEventEvent<
	IOrganization = Organization,
	ILocation = Location,
	IUser = User
> extends ISpruceEvent<IOrganization, ILocation, IUser> {
	/** The event payload */
	payload: ICoreRescheduleCalendarEventPayload
}

export interface ICoreRescheduleCalendarEventBody {
	/** Whether the operation succeeded or failed */
	status?: 'success' | 'failure'
	/** The updated calendar event */
	calendarEvent?: ICoreGQLCalendarEvent
	/** Warnings about the reschedule operation */
	warnings?: ISpruceEventWarning[]
}
