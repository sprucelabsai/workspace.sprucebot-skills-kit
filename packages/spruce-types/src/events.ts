import { Location, Organization, User } from '@sprucelabs/spruce-skill-server'

export interface ISpruceEvent<
	IOrganization = Organization,
	ILocation = Location,
	IUser = User
> {
	/** The Organization for this event */
	Organization?: IOrganization | null
	/** The Location for this event */
	Location?: ILocation | null
	/** The User for this event */
	User?: IUser | null
}

export interface ISpruceEventError {
	/** A code that can be used to identify this error. INVALID_PARAMETERS for example */
	code: string
	/** A description of the error that will be useful to a developer */
	reason: string
	/** A description of the error that can be displayed to the user */
	friendlyReason: string
}

export interface ISpruceEventWarning {
	/** A code that can be used to identify this warning. INVALID_PARAMETERS for example */
	code: string
	/** A description of the warning that will be useful to a developer */
	reason: string
	/** A description of the warning that can be displayed to the user */
	friendlyReason: string
}
