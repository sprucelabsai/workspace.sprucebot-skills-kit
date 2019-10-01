import { IHWCalendarEvent } from './generated/hw-gql'
import { ICoreGQLCalendar } from './generated/api-gql'

export interface ISpruceEventV1User {
	/** The User's id */
	id: string
	/** The User's first name */
	firstName: string | null
	/** The User's last name */
	lastName: string | null
	/** The User's name */
	name: string
	/** The User's phoneNumber (enterprise skills only) */
	phoneNumber: string
	/** The User's profile image UUID used to build profileImages */
	profileImageUUID: string | null
	/** The User's profile images */
	profileImages: {
		profile60: string
		'profile60@2x': string
		profile150: string
		'profile150@2x': string
	} | null
	/** Default profile images that can be displayed if the User does not have a custom one set */
	defaultProfileImages: {
		profile60: string
		'profile60@2x': string
		profile150: string
		'profile150@2x': string
	}
	/** Will always be set. The preferred way to refer to a User */
	casualName: string
	/** Whether the last notification to the User could be delivered */
	lastMessageDelivered: boolean
}

export interface ISpruceEventV1Location {
	/** The Location id */
	id: string
	/** The Location name */
	name: string
	/** The Location slug */
	slug: string
	/** The Location address */
	addressLine1: string | null
	/** The Location address */
	addressLine2: string | null
	/** The Location address */
	addressCity: string | null
	/** The Location address */
	addressState: string | null
	/** The Location address */
	addressZip: string | null
	/** The Location address */
	addressCountry: string | null
	/** The coordinates of the Location */
	geo: {
		/** Latitude */
		lat: number
		/** Longitude */
		lng: number
	} | null
	/** The Organization id for the Location */
	OrganizationId: string
	/** Whether the location should be publicly visible */
	isPublic: boolean
	/**
	 * The timezone of the Location.
	 * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	 * */
	timezone: string
	/** Whether the location has been archived and is no longer active */
	archived: boolean
	/** The Location's main phone number */
	phoneNumber: string | null
	/** In the Spruce app, if the lock screen should be enabled */
	enableLockScreen: boolean
	/** The store number assigned to the Location */
	storeNum: string | null
	Organization?: {
		id: string
		name: string
		allowWhiteLabelling: boolean
		whiteLabellingStylesheetUrl: string | null
	}
}

export interface ISpruceEventBase {
	/** The delivery attempt number. On first attempt this will be 1 */
	deliveryTry: number
	/** A UUID that identifies this event. Will be the same for re-tried events */
	eventId: string
	/** A UUID that identifies this event retry. Only set for re-tried events */
	retryId?: string
	/** The name of the event, "did-enter" for example */
	name: string
	/** If there has been more than 1 attempt, this will be set to the first time the event was tried */
	firstSentAt?: Date
}

/** 🌲🤖 Defines ctx.event for EVENT_VERSION=2 */
export interface ISpruceEventV2<IPayload> extends ISpruceEventBase {
	/** The event payload */
	payload: IPayload
}

/** 🌲🤖 Defines ctx.event for EVENT_VERSION=1 */
export interface ISpruceEventV1<IPayload> extends ISpruceEventBase {
	/** The acls for the user, based on your requestedAcls in config.acls.requests  */
	acl: {
		[skillSlug: string]: Record<string, boolean>
	}
	/** The email address for the UserLocation */
	email?: string | null
	/** The UserLocation id */
	id?: string
	/** If the user is a developer for the Location */
	isDev?: boolean
	/** The job associated to the user at the Location */
	JobId?: string | null
	/** The id of the last AccessPoint the user connected to */
	lastAccessPoint?: string | null
	/** The last time the user visited the Location */
	lastRecordedVisit?: Date | null
	/** The Location id */
	LocationId?: string | null
	/** The Location */
	Location?: ISpruceEventV1Location | null
	/** Whether the user wishes to receive reports about the Location */
	optOutOfReports?: boolean
	/** The Organization id */
	organizationId?: string | null
	/** The event payload */
	payload: IPayload
	/** The user role at the location: "owner", "teammate", "guest". Note that group manager, organization owners, and location managers all have this set to "owner" */
	role?: string
	/** The current status of the user. "online" or "offline" */
	status?: string
	/** The User id */
	UserId?: string | null
	/** The User making the request */
	User?: ISpruceEventV1User | null
	/** The number of times the user has visited the Location */
	visits?: number
}

/** 🌲🤖 An error thrown from a skill event handler */
export interface ISpruceEventError {
	/** An http code */
	code?: number
	/** A name that can be used to identify this error. INVALID_PARAMETERS for example */
	name: string
	/** A description of the error that will be useful to a developer */
	reason: string
	/** A description of the error that can be displayed to the user */
	friendlyReason: string
	/** The status */
	status: 'failure'
}

/** 🌲🤖 A warning returned from a skill event handler */
export interface ISpruceEventWarning {
	/** A code that can be used to identify this warning. INVALID_PARAMETERS for example */
	name: string
	/** A description of the warning that will be useful to a developer */
	reason: string
	/** A description of the warning that can be displayed to the user */
	friendlyReason: string
}

/**
 * Calendars
 */
/** Payload sent to your event listener when listening to: get-calendars */
export interface IEventGetCalendarsPayload {
	/** the route the user is viewing (like calendar_location) */
	route: string
}

/** set to the body of as a response get-calendars event */
export type IEventGetCalendarsBody = ICoreGQLCalendar[]

/**
 * Calendar Events
 */
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
