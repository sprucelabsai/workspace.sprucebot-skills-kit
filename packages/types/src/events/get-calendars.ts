import { ICoreGQLCalendar } from '../generated/api-gql'
import { IHWCalendarEvent } from '../generated/hw-gql'

export interface IEventGetCalendarsPayload {
	/** the route the user is viewing (like calendar_location) */
	route: string
}

/** set to the body of as a response get-calendars event */
export type IEventGetCalendarsBody = ICoreGQLCalendar[]

/** Payload sent to your event listener when listening to: get-calendar-events */
export interface IEventGetCalendarEventsPayload {
	/** id of calendar we need events for */
	calendarId: string
	/** user id's of users visible in the calendar */
	userIds: string[]
	/** start date/time in ISO8601 */
	startAt: string
	/** end date/time in ISO6801  */
	endAt: string
}

/** Body of response to ge-calendar-events event */
export interface IEventGetCalendarEventsBody {
	/** An array of calendar events */
	calendarEvents?: IHWCalendarEvent[]
}
