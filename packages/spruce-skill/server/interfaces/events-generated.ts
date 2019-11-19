/* eslint-disable */
// DO NOT EDIT. THIS FILE IS GENERATED FROM https://local-api.spruce.ai//api/2.0/types/events
import { IHWCalendarEvent, IHWCalendarEventDetailsItem, IHWAction } from '@sprucelabs/spruce-types'


/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get UI enhancements
 */
export namespace SpruceEvents.core.GetUiEnhancements {
	/** The event name  */
	export const eventName = 'get-ui-enhancements'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetUiEnhancements.eventName', payload))
	*/
	export interface IPayload {
		/** The view that is being displayed. booking:create-appointment for example */
		view: string

		/** Other arbitrary payload properties */
		[key: string]: any
	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetUiEnhancements.IResponseBody = { ... }
	*/
	export interface IResponseBody {
		/**  */
		sections?: {
			/** The section id for this enhancement */
			id: string
			/** Event detail items to place in this section */
			eventDetailsItems?: IHWCalendarEventDetailsItem[]
			/** Actions that should be added to the context menu of this section */
			actions?: IHWAction[]
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Emit this event when a new calendar event was created
 */
export namespace SpruceEvents.core.DidCreateCalendarEvent {
	/** The event name  */
	export const eventName = 'did-create-calendar-event'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API emits this event. You'll receive a payload in your event handler (server/events/did-create-calendar-event.ts)
	 * You'll create an event handler that receives this payload.
	 * Don't forget to subscribe to this event in config/eventContract.ts
	*/
	export interface IPayload {
		/** The id of the calendar that this event should be added to */
		calendarId?: string
		/** The calendar event that was created */
		calendarEvent?: IHWCalendarEvent
	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill will respond to this event with this data in the body.
	*/
	export interface IResponseBody {
		/** Will be set to &quot;success&quot; if the event is received and processed */
		status?: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for settings to display on a page
 */
export namespace SpruceEvents.core.GetSettings {
	/** The event name  */
	export const eventName = 'get-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetSettings.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetSettings.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for settings validation
 */
export namespace SpruceEvents.core.ValidateSettings {
	/** The event name  */
	export const eventName = 'validate-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.ValidateSettings.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.ValidateSettings.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for views to display on a page
 */
export namespace SpruceEvents.core.GetViews {
	/** The event name  */
	export const eventName = 'get-views'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetViews.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetViews.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks this skill to provide cards
 */
export namespace SpruceEvents.core.GetCards {
	/** The event name  */
	export const eventName = 'get-cards'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetCards.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetCards.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When the skill is installed to a location
 */
export namespace SpruceEvents.core.WasInstalled {
	/** The event name  */
	export const eventName = 'was-installed'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.WasInstalled.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.WasInstalled.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest joins wifi at a location for the first time
 */
export namespace SpruceEvents.core.DidSignup {
	/** The event name  */
	export const eventName = 'did-signup'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidSignup.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidSignup.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest returns and their phone hits the wifi
 */
export namespace SpruceEvents.core.DidEnter {
	/** The event name  */
	export const eventName = 'did-enter'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidEnter.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidEnter.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Triggered an hour after a guest leaves
 */
export namespace SpruceEvents.core.DidLeave {
	/** The event name  */
	export const eventName = 'did-leave'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidLeave.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidLeave.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * A guest has sent a text to Sprucebot
 */
export namespace SpruceEvents.core.DidMessage {
	/** The event name  */
	export const eventName = 'did-message'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidMessage.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidMessage.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest adds a new device to a location. Like adding their laptop
 */
export namespace SpruceEvents.core.DidAddDevice {
	/** The event name  */
	export const eventName = 'did-add-device'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidAddDevice.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidAddDevice.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any user updates their first or last name
 */
export namespace SpruceEvents.core.DidUpdateUser {
	/** The event name  */
	export const eventName = 'did-update-user'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidUpdateUser.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidUpdateUser.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any guest opts out of a location. By now you have already lost access to their meta data.
 */
export namespace SpruceEvents.core.DidOptOut {
	/** The event name  */
	export const eventName = 'did-opt-out'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidOptOut.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidOptOut.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * They had, at one time, opted out. But, now they have remotely opted back in
 */
export namespace SpruceEvents.core.DidRemoteRejoin {
	/** The event name  */
	export const eventName = 'did-remote-rejoin'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidRemoteRejoin.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidRemoteRejoin.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Sprucebot has made the decision that now is the perfect time to send training material
 */
export namespace SpruceEvents.core.WillSendTraining {
	/** The event name  */
	export const eventName = 'will-send-training'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.WillSendTraining.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.WillSendTraining.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Provide your own search results in the platform
 */
export namespace SpruceEvents.core.BigSearch {
	/** The event name  */
	export const eventName = 'big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.BigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.BigSearch.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Give people the power import your search results into the platform
 */
export namespace SpruceEvents.core.ImportFromBigSearch {
	/** The event name  */
	export const eventName = 'import-from-big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.ImportFromBigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.ImportFromBigSearch.IResponseBody = { ... }
	*/
	export type IResponseBody = any


}


/**
 * Local Workspace
 *
 * Example event definition. The corresponding event handler for this file would go in server/events/workspace/my-event.ts
 */
export namespace SpruceEvents.workspace.MyEvent {
	/** The event name  */
	export const eventName = 'workspace:my-event'

	/**
	 * Event Payload
	 *
	 * The Local Workspace Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.workspace.MyEvent.eventName', payload))
	*/
	export interface IPayload {
		/** A required string variable. */
		myVar: string
	}

	/**
	 * Event Response
	 *
	 * The Local Workspace Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.workspace.MyEvent.IResponseBody = { ... }
	*/
	export interface IResponseBody {
		/** If everything went ok, this will be set to &quot;success&quot; */
		status: string
		/** Array of randomly generated people */
		randomPeople: {
			/** A random first name */
			lastName: string
			/** A random first name */
			firstName: string
			/** A number representing something about this person */
			personNum: number
			/** A random array of this person&#x27;s children&#x27;s names */
			childNames?: string[]
		}[]
	}


}

