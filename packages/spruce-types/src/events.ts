import { Location, User } from '@sprucelabs/spruce-skill-server'

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
export interface ISpruceEventV2<IPayload> extends ISpruceEventBase {
	/** The event payload */
	payload: IPayload
}

type LocationAttributes = typeof Location.attributes
type UserAttributes = typeof User.attributes

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
	Location?: LocationAttributes | null
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
	User?: UserAttributes | null
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
