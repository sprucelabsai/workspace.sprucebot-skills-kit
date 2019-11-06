import { IHWCalendarEventDetailsItem, IHWAction } from '../generated/hw-gql'

export interface IEventGetUIEnhancementsPayload {
	/** The view that is being displayed. booking:create-appointment for example */
	view: string

	/** Other arbitrary payload properties defined by the specific view */
	[key: string]: any
}

export interface IUIEnhancementSection {
	/** The section id for this enhancement */
	id: string

	/** Event detail items to place in this section */
	eventDetailsItems?: IHWCalendarEventDetailsItem[]

	/** Actions that should be added to the context menu of this section */
	actions?: IHWAction[]
}

/** set to the body of as a response get-calendars event */
export interface IEventGetUIEnhancementsBody {
	/** Array of UIEnhancements */
	sections: IUIEnhancementSection[]
}
