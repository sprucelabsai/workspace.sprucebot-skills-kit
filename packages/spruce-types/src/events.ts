import {
	ISpruceAuthOrganization,
	ISpruceAuthLocation,
	ISpruceAuthUser,
	Location,
	User
} from '@sprucelabs/spruce-skill-server'

/** 🌲🤖 Optional auth data for Organization, Location, and User depending on the type of event  */
export interface ISpruceEventAuth<
	IAuthOrganization = ISpruceAuthOrganization,
	IAuthLocation = ISpruceAuthLocation,
	IAuthUser = ISpruceAuthUser
> {
	/** The Organization for this event */
	Organization?: IAuthOrganization | null
	/** The Location for this event */
	Location?: IAuthLocation | null
	/** The User for this event */
	User?: IAuthUser | null
	/** JWT containing the signed data that is parsed into ctx.event.payload */
	jwt: string
}

interface ISpruceEventBase {
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
export interface ISpruceEventV2 extends ISpruceEventBase {
	/** The event payload */
	payload: Record<string, any>
}

/** 🌲🤖 Defines ctx.event for EVENT_VERSION=1 */
export interface ISpruceEventV1 extends ISpruceEventBase {
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
	Location?: Location | null
	/** Whether the user wishes to receive reports about the Location */
	optOutOfReports?: boolean
	/** The Organization id */
	organizationId?: string | null
	/** The event payload */
	payload: Record<string, any>
	/** The user role at the location: "owner", "teammate", "guest". Note that group manager, organization owners, and location managers all have this set to "owner" */
	role?: string
	/** The current status of the user. "online" or "offline" */
	status?: string
	/** The User id */
	UserId?: string | null
	/** The User making the request */
	User?: User | null
	/** The number of times the user has visited the Location */
	visits?: number
}

/** 🌲🤖 An error thrown from a skill event handler */
export interface ISpruceEventError {
	/** An http code */
	code: number
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
