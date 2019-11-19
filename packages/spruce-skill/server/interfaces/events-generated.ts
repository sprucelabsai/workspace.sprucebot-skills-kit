/* eslint-disable */
// DO NOT EDIT. THIS FILE IS GENERATED FROM https://local-api.spruce.ai//api/2.0/types/events
import { IHWCalendarEvent, IHWCalendarEventDetailsItem, IHWAction } from '@sprucelabs/spruce-types'


/** The Spruce Core API. Visit https://developer.spruce.ai for more information. */
export namespace SpruceEvents.core {
	/** All available events  */
	export enum Events {
		/** Subscribe | 🌲🤖 Core: Get UI enhancements */
		GetUiEnhancements = 'get-ui-enhancements',

		/** Publish | Emit this event when a new calendar event was created */
		DidCreateCalendarEvent = 'did-create-calendar-event',

		/** Subscribe | Core asks for settings to display on a page */
		GetSettings = 'get-settings',

		/** Subscribe | Core asks for settings validation */
		ValidateSettings = 'validate-settings',

		/** Subscribe | Core asks for views to display on a page */
		GetViews = 'get-views',

		/** Subscribe | Core asks this skill to provide cards */
		GetCards = 'get-cards',

		/** Subscribe | When the skill is installed to a location */
		WasInstalled = 'was-installed',

		/** Subscribe | When a guest joins wifi at a location for the first time */
		DidSignup = 'did-signup',

		/** Subscribe | When a guest returns and their phone hits the wifi */
		DidEnter = 'did-enter',

		/** Subscribe | Triggered an hour after a guest leaves */
		DidLeave = 'did-leave',

		/** Subscribe | A guest has sent a text to Sprucebot */
		DidMessage = 'did-message',

		/** Subscribe | When a guest adds a new device to a location. Like adding their laptop */
		DidAddDevice = 'did-add-device',

		/** Subscribe | When any user updates their first or last name */
		DidUpdateUser = 'did-update-user',

		/** Subscribe | When any guest opts out of a location. By now you have already lost access to their meta data. */
		DidOptOut = 'did-opt-out',

		/** Subscribe | They had, at one time, opted out. But, now they have remotely opted back in */
		DidRemoteRejoin = 'did-remote-rejoin',

		/** Subscribe | Sprucebot has made the decision that now is the perfect time to send training material */
		WillSendTraining = 'will-send-training',

		/** Subscribe | Provide your own search results in the platform */
		BigSearch = 'big-search',

		/** Subscribe | Give people the power import your search results into the platform */
		ImportFromBigSearch = 'import-from-big-search'

	}

	/**
	 * Event Payload: 🌲🤖 Core: Get UI enhancements
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('get-ui-enhancements', payload))
	*/
	export interface IGetUiEnhancementsPayload {
		/** The view that is being displayed. booking:create-appointment for example */
		view: string

		/** Other arbitrary payload properties */
		[key: string]: any
	}

	/**
	 * Event Response: 🌲🤖 Core: Get UI enhancements
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetUiEnhancementsBody = { ... }
	*/
	export interface IGetUiEnhancementsBody {
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


	/**
	 * Event Payload: Emit this event when a new calendar event was created
	 *
	 * The Spruce Core API emits this event. You'll receive a payload in your event handler (server/events/did-create-calendar-event.ts)
	 * You'll create an event handler that receives this payload.
	 * Don't forget to subscribe to this event in config/eventContract.ts
	*/
	export interface IDidCreateCalendarEventPayload {
		/** The id of the calendar that this event should be added to */
		calendarId?: string
		/** The calendar event that was created */
		calendarEvent?: IHWCalendarEvent
	}

	/**
	 * Event Response: Emit this event when a new calendar event was created
	 *
	 * The Spruce Core API Skill will respond to this event with this data in the body.
	*/
	export interface IDidCreateCalendarEventBody {
		/** Will be set to &quot;success&quot; if the event is received and processed */
		status?: string
	}


	/**
	 * Event Payload: Core asks for settings to display on a page
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('get-settings', payload))
	*/
	export type IGetSettingsPayload = any

	/**
	 * Event Response: Core asks for settings to display on a page
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetSettingsBody = { ... }
	*/
	export type IGetSettingsBody = any


	/**
	 * Event Payload: Core asks for settings validation
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('validate-settings', payload))
	*/
	export type IValidateSettingsPayload = any

	/**
	 * Event Response: Core asks for settings validation
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IValidateSettingsBody = { ... }
	*/
	export type IValidateSettingsBody = any


	/**
	 * Event Payload: Core asks for views to display on a page
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('get-views', payload))
	*/
	export type IGetViewsPayload = any

	/**
	 * Event Response: Core asks for views to display on a page
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetViewsBody = { ... }
	*/
	export type IGetViewsBody = any


	/**
	 * Event Payload: Core asks this skill to provide cards
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('get-cards', payload))
	*/
	export type IGetCardsPayload = any

	/**
	 * Event Response: Core asks this skill to provide cards
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetCardsBody = { ... }
	*/
	export type IGetCardsBody = any


	/**
	 * Event Payload: When the skill is installed to a location
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('was-installed', payload))
	*/
	export type IWasInstalledPayload = any

	/**
	 * Event Response: When the skill is installed to a location
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IWasInstalledBody = { ... }
	*/
	export type IWasInstalledBody = any


	/**
	 * Event Payload: When a guest joins wifi at a location for the first time
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-signup', payload))
	*/
	export type IDidSignupPayload = any

	/**
	 * Event Response: When a guest joins wifi at a location for the first time
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidSignupBody = { ... }
	*/
	export type IDidSignupBody = any


	/**
	 * Event Payload: When a guest returns and their phone hits the wifi
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-enter', payload))
	*/
	export type IDidEnterPayload = any

	/**
	 * Event Response: When a guest returns and their phone hits the wifi
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidEnterBody = { ... }
	*/
	export type IDidEnterBody = any


	/**
	 * Event Payload: Triggered an hour after a guest leaves
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-leave', payload))
	*/
	export type IDidLeavePayload = any

	/**
	 * Event Response: Triggered an hour after a guest leaves
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidLeaveBody = { ... }
	*/
	export type IDidLeaveBody = any


	/**
	 * Event Payload: A guest has sent a text to Sprucebot
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-message', payload))
	*/
	export type IDidMessagePayload = any

	/**
	 * Event Response: A guest has sent a text to Sprucebot
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidMessageBody = { ... }
	*/
	export type IDidMessageBody = any


	/**
	 * Event Payload: When a guest adds a new device to a location. Like adding their laptop
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-add-device', payload))
	*/
	export type IDidAddDevicePayload = any

	/**
	 * Event Response: When a guest adds a new device to a location. Like adding their laptop
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidAddDeviceBody = { ... }
	*/
	export type IDidAddDeviceBody = any


	/**
	 * Event Payload: When any user updates their first or last name
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-update-user', payload))
	*/
	export type IDidUpdateUserPayload = any

	/**
	 * Event Response: When any user updates their first or last name
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidUpdateUserBody = { ... }
	*/
	export type IDidUpdateUserBody = any


	/**
	 * Event Payload: When any guest opts out of a location. By now you have already lost access to their meta data.
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-opt-out', payload))
	*/
	export type IDidOptOutPayload = any

	/**
	 * Event Response: When any guest opts out of a location. By now you have already lost access to their meta data.
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidOptOutBody = { ... }
	*/
	export type IDidOptOutBody = any


	/**
	 * Event Payload: They had, at one time, opted out. But, now they have remotely opted back in
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('did-remote-rejoin', payload))
	*/
	export type IDidRemoteRejoinPayload = any

	/**
	 * Event Response: They had, at one time, opted out. But, now they have remotely opted back in
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDidRemoteRejoinBody = { ... }
	*/
	export type IDidRemoteRejoinBody = any


	/**
	 * Event Payload: Sprucebot has made the decision that now is the perfect time to send training material
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('will-send-training', payload))
	*/
	export type IWillSendTrainingPayload = any

	/**
	 * Event Response: Sprucebot has made the decision that now is the perfect time to send training material
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IWillSendTrainingBody = { ... }
	*/
	export type IWillSendTrainingBody = any


	/**
	 * Event Payload: Provide your own search results in the platform
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('big-search', payload))
	*/
	export type IBigSearchPayload = any

	/**
	 * Event Response: Provide your own search results in the platform
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IBigSearchBody = { ... }
	*/
	export type IBigSearchBody = any


	/**
	 * Event Payload: Give people the power import your search results into the platform
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('import-from-big-search', payload))
	*/
	export type IImportFromBigSearchPayload = any

	/**
	 * Event Response: Give people the power import your search results into the platform
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IImportFromBigSearchBody = { ... }
	*/
	export type IImportFromBigSearchBody = any


}


/** Scheduling */
export namespace SpruceEvents.schedulingtest {
	/** All available events  */
	export enum Events {
	}

}


/** Teammate Reviews (local) */
export namespace SpruceEvents.teammatereviews {
	/** All available events  */
	export enum Events {
	}

}


/** Guest feedback */
export namespace SpruceEvents.guestfeedback {
	/** All available events  */
	export enum Events {
	}

}


/** Checkout powered by the most advanced Schrutebucks technology ever created */
export namespace SpruceEvents.schrutebuckspos {
	/** All available events  */
	export enum Events {
	}

}


/** Take Booking to the next level with advanced pricing and timing. */
export namespace SpruceEvents.esm {
	/** All available events  */
	export enum Events {
	}

}


/** Little Black Book (local) */
export namespace SpruceEvents.littleBlackBook {
	/** All available events  */
	export enum Events {
	}

}


/** Commerce (local) */
export namespace SpruceEvents.commerce {
	/** All available events  */
	export enum Events {
		/** Subscribe | Updates an order w/ new status or other info */
		UpdateOrder = 'update-order',

		/** Subscribe | Start checkout process */
		InitiateCheckout = 'initiate-checkout',

		/** Subscribe | Request a POS URL to modify an order */
		InitiateModifyOrder = 'initiate-modify-order'

	}

	/**
	 * Event Payload: Updates an order w/ new status or other info
	 *
	 * The Commerce (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('commerce:update-order', payload))
	*/
	export type IUpdateOrderPayload = any

	/**
	 * Event Response: Updates an order w/ new status or other info
	 *
	 * The Commerce (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateOrderBody = { ... }
	*/
	export type IUpdateOrderBody = any


	/**
	 * Event Payload: Start checkout process
	 *
	 * The Commerce (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('commerce:initiate-checkout', payload))
	*/
	export type IInitiateCheckoutPayload = any

	/**
	 * Event Response: Start checkout process
	 *
	 * The Commerce (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IInitiateCheckoutBody = { ... }
	*/
	export type IInitiateCheckoutBody = any


	/**
	 * Event Payload: Request a POS URL to modify an order
	 *
	 * The Commerce (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('commerce:initiate-modify-order', payload))
	*/
	export type IInitiateModifyOrderPayload = any

	/**
	 * Event Response: Request a POS URL to modify an order
	 *
	 * The Commerce (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IInitiateModifyOrderBody = { ... }
	*/
	export type IInitiateModifyOrderBody = any


}


/** Booking */
export namespace SpruceEvents.booking {
	/** All available events  */
	export enum Events {
		/** Subscribe | Gets a booking tier by id */
		GetTier = 'get-tier',

		/** Subscribe | Gets all booking tiers for an org */
		GetTiers = 'get-tiers',

		/** Subscribe | Create a booking tier for an org */
		CreateTier = 'create-tier',

		/** Subscribe | Delete a booking tier for an org */
		DeleteTier = 'delete-tier',

		/** Subscribe | Get bundles */
		GetBundles = 'get-bundles',

		/** Subscribe | Get service */
		GetService = 'get-service',

		/** Subscribe | Updates a service */
		SetService = 'set-service',

		/** Subscribe | Update a booking tier for an org */
		UpdateTier = 'update-tier',

		/** Subscribe | Get provider */
		GetProvider = 'get-provider',

		/** Subscribe | Get services */
		GetServices = 'get-services',

		/** Subscribe | Create a bundle */
		CreateBundle = 'create-bundle',

		/** Subscribe | Delete a bundle */
		DeleteBundle = 'delete-bundle',

		/** Subscribe | Gets organization locations */
		GetLocations = 'get-locations',

		/** Subscribe | Get providers */
		GetProviders = 'get-providers',

		/** Subscribe | Create a new service */
		CreateService = 'create-service',

		/** Subscribe | Deletes a service */
		DeleteService = 'delete-service',

		/** Subscribe | Duplicate a booking tier for an org */
		DuplicateTier = 'duplicate-tier',

		/** Subscribe | Gets categories */
		GetCategories = 'get-categories',

		/** Subscribe | Creates a new category */
		CreateCategory = 'create-category',

		/** Subscribe | Deletes a category */
		DeleteCategory = 'delete-category',

		/** Subscribe | Get an appointment by  id */
		GetAppointment = 'get-appointment',

		/** Subscribe | Get a booking tier override for an org */
		GetTierOverride = 'get-tier-override',

		/** Subscribe | Updates categories */
		UpdateCategories = 'update-categories',

		/** Subscribe | Cancels an appointment */
		CancelAppointment = 'cancel-appointment',

		/** Subscribe | Create a new appointment */
		CreateAppointment = 'create-appointment',

		/** Subscribe | Get available times for a provider */
		GetProviderTimes = 'get-provider-times',

		/** Subscribe | Get all booking tier override for an org */
		GetTierOverrides = 'get-tier-overrides',

		/** Subscribe | Updates categories */
		SetCategoryItems = 'set-category-items',

		/** Subscribe | Update an appointment */
		UpdateAppointment = 'update-appointment',

		/** Subscribe | Confirm an appointment */
		ConfirmAppointment = 'confirm-appointment',

		/** Subscribe | Get a booking tier assignment for an org */
		GetTierAssignment = 'get-tier-assignment',

		/** Subscribe | Create a booking tier override for an org */
		CreateTierOverride = 'create-tier-override',

		/** Subscribe | Delete a booking tier override for an org */
		DeleteTierOverride = 'delete-tier-override',

		/** Subscribe | Get booking tier assignments for an org */
		GetTierAssignments = 'get-tier-assignments',

		/** Subscribe | Updates teammate info */
		UpdateTeammateInfo = 'update-teammate-info',

		/** Subscribe | Get a booking tier override for an org */
		UpdateTierOverride = 'update-tier-override',

		/** Subscribe | Create booking tier overrides for an org */
		CreateTierOverrides = 'create-tier-overrides',

		/** Subscribe | Delete booking tier overrides for an org */
		DeleteTierOverrides = 'delete-tier-overrides',

		/** Subscribe | Gets user appointments */
		GetUserAppointments = 'get-user-appointments',

		/** Subscribe | Updates multiple teammates order */
		UpdateTeammateOrder = 'update-teammate-order',

		/** Subscribe | Update booking tier overrides for an org */
		UpdateTierOverrides = 'update-tier-overrides',

		/** Subscribe | Create a booking tier assignment for an org */
		CreateTierAssignment = 'create-tier-assignment',

		/** Subscribe | Delete a booking tier assignment for an org */
		DeleteTierAssignment = 'delete-tier-assignment',

		/** Publish | Triggered when an appointment has been updated */
		DidUpdateAppointment = 'did-update-appointment',

		/** Subscribe | Update a booking tier assignment for an org */
		UpdateTierAssignment = 'update-tier-assignment',

		/** Subscribe | Sets teammate as provider of service */
		CreateTeammateService = 'create-teammate-service',

		/** Subscribe | Create booking tier assignments for an org */
		CreateTierAssignments = 'create-tier-assignments',

		/** Subscribe | Sets teammate as provider of service */
		DeleteTeammateService = 'delete-teammate-service',

		/** Subscribe | Delete booking tier assignments for an org */
		DeleteTierAssignments = 'delete-tier-assignments',

		/** Subscribe | Get available providers for a given date/time */
		GetAvailableProviders = 'get-available-providers',

		/** Subscribe | Update booking tier assignments for an org */
		UpdateTierAssignments = 'update-tier-assignments',

		/** Subscribe | Create new appointments in bulk */
		BulkCreateAppointments = 'bulk-create-appointments',

		/** Subscribe | Cancels an appointment */
		CancelAppointmentGroup = 'cancel-appointment-group',

		/** Subscribe | Gets appointments for a location */
		GetLocationAppointments = 'get-location-appointments',

		/** Subscribe | Get available appointments */
		GetAvailableAppointments = 'get-available-appointments',

		/** Subscribe | Get a booking tier assignment for an org */
		GetTierAssignmentCategory = 'get-tier-assignment-category',

		/** Subscribe | Get default appointment times */
		GetDefaultAppointmentTimes = 'get-default-appointment-times',

		/** Subscribe | Get booking tier assignments for an org */
		GetTierAssignmentCategories = 'get-tier-assignment-categories',

		/** Subscribe | Create a booking tier assignment for an org */
		CreateTierAssignmentCategory = 'create-tier-assignment-category',

		/** Subscribe | Delete a booking tier assignment for an org */
		DeleteTierAssignmentCategory = 'delete-tier-assignment-category',

		/** Subscribe | Update a booking tier assignment for an org */
		UpdateTierAssignmentCategory = 'update-tier-assignment-category',

		/** Subscribe | Confirms a selected appointment */
		ConversationConfirmAppointment = 'conversation-confirm-appointment',

		/** Subscribe | Sets overrides for a teammate service */
		UpdateTeammateServiceOverride = 'update-teammate-service-override',

		/** Subscribe | Create booking tier assignments for an org */
		CreateTierAssignmentCategories = 'create-tier-assignment-categories',

		/** Subscribe | Delete booking tier assignments for an org */
		DeleteTierAssignmentCategories = 'delete-tier-assignment-categories',

		/** Subscribe | Get booking tier assignments for an org */
		GetTierAssignmentsByLocations = 'get-tier-assignments-by-locations',

		/** Subscribe | Update booking tier assignments for an org */
		UpdateTierAssignmentCategories = 'update-tier-assignment-categories',

		/** Subscribe | Delete booking tier assignments for an org by location(s) */
		DeleteTierAssignmentsByLocation = 'delete-tier-assignments-by-location',

		/** Subscribe | Get a booking tier assignment for an org */
		GetLocationsWithTierAssignments = 'get-locations-with-tier-assignments',

		/** Subscribe | Returns choices for selecting an appointment */
		ConversationGetUpcomingUserAppointmentsToConfirm = 'conversation-get-upcoming-user-appointments-to-confirm'

	}

	/**
	 * Event Payload: Gets a booking tier by id
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier', payload))
	*/
	export type IGetTierPayload = any

	/**
	 * Event Response: Gets a booking tier by id
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierBody = { ... }
	*/
	export type IGetTierBody = any


	/**
	 * Event Payload: Gets all booking tiers for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tiers', payload))
	*/
	export type IGetTiersPayload = any

	/**
	 * Event Response: Gets all booking tiers for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTiersBody = { ... }
	*/
	export type IGetTiersBody = any


	/**
	 * Event Payload: Create a booking tier for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier', payload))
	*/
	export type ICreateTierPayload = any

	/**
	 * Event Response: Create a booking tier for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierBody = { ... }
	*/
	export type ICreateTierBody = any


	/**
	 * Event Payload: Delete a booking tier for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier', payload))
	*/
	export type IDeleteTierPayload = any

	/**
	 * Event Response: Delete a booking tier for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierBody = { ... }
	*/
	export type IDeleteTierBody = any


	/**
	 * Event Payload: Get bundles
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-bundles', payload))
	*/
	export type IGetBundlesPayload = any

	/**
	 * Event Response: Get bundles
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetBundlesBody = { ... }
	*/
	export type IGetBundlesBody = any


	/**
	 * Event Payload: Get service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-service', payload))
	*/
	export type IGetServicePayload = any

	/**
	 * Event Response: Get service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetServiceBody = { ... }
	*/
	export type IGetServiceBody = any


	/**
	 * Event Payload: Updates a service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:set-service', payload))
	*/
	export type ISetServicePayload = any

	/**
	 * Event Response: Updates a service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ISetServiceBody = { ... }
	*/
	export type ISetServiceBody = any


	/**
	 * Event Payload: Update a booking tier for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier', payload))
	*/
	export type IUpdateTierPayload = any

	/**
	 * Event Response: Update a booking tier for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierBody = { ... }
	*/
	export type IUpdateTierBody = any


	/**
	 * Event Payload: Get provider
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-provider', payload))
	*/
	export type IGetProviderPayload = any

	/**
	 * Event Response: Get provider
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetProviderBody = { ... }
	*/
	export type IGetProviderBody = any


	/**
	 * Event Payload: Get services
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-services', payload))
	*/
	export type IGetServicesPayload = any

	/**
	 * Event Response: Get services
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetServicesBody = { ... }
	*/
	export type IGetServicesBody = any


	/**
	 * Event Payload: Create a bundle
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-bundle', payload))
	*/
	export type ICreateBundlePayload = any

	/**
	 * Event Response: Create a bundle
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateBundleBody = { ... }
	*/
	export type ICreateBundleBody = any


	/**
	 * Event Payload: Delete a bundle
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-bundle', payload))
	*/
	export type IDeleteBundlePayload = any

	/**
	 * Event Response: Delete a bundle
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteBundleBody = { ... }
	*/
	export type IDeleteBundleBody = any


	/**
	 * Event Payload: Gets organization locations
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-locations', payload))
	*/
	export type IGetLocationsPayload = any

	/**
	 * Event Response: Gets organization locations
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetLocationsBody = { ... }
	*/
	export type IGetLocationsBody = any


	/**
	 * Event Payload: Get providers
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-providers', payload))
	*/
	export type IGetProvidersPayload = any

	/**
	 * Event Response: Get providers
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetProvidersBody = { ... }
	*/
	export type IGetProvidersBody = any


	/**
	 * Event Payload: Create a new service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-service', payload))
	*/
	export type ICreateServicePayload = any

	/**
	 * Event Response: Create a new service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateServiceBody = { ... }
	*/
	export type ICreateServiceBody = any


	/**
	 * Event Payload: Deletes a service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-service', payload))
	*/
	export type IDeleteServicePayload = any

	/**
	 * Event Response: Deletes a service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteServiceBody = { ... }
	*/
	export type IDeleteServiceBody = any


	/**
	 * Event Payload: Duplicate a booking tier for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:duplicate-tier', payload))
	*/
	export type IDuplicateTierPayload = any

	/**
	 * Event Response: Duplicate a booking tier for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDuplicateTierBody = { ... }
	*/
	export type IDuplicateTierBody = any


	/**
	 * Event Payload: Gets categories
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-categories', payload))
	*/
	export type IGetCategoriesPayload = any

	/**
	 * Event Response: Gets categories
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetCategoriesBody = { ... }
	*/
	export type IGetCategoriesBody = any


	/**
	 * Event Payload: Creates a new category
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-category', payload))
	*/
	export type ICreateCategoryPayload = any

	/**
	 * Event Response: Creates a new category
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateCategoryBody = { ... }
	*/
	export type ICreateCategoryBody = any


	/**
	 * Event Payload: Deletes a category
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-category', payload))
	*/
	export type IDeleteCategoryPayload = any

	/**
	 * Event Response: Deletes a category
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteCategoryBody = { ... }
	*/
	export type IDeleteCategoryBody = any


	/**
	 * Event Payload: Get an appointment by  id
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-appointment', payload))
	*/
	export type IGetAppointmentPayload = any

	/**
	 * Event Response: Get an appointment by  id
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetAppointmentBody = { ... }
	*/
	export type IGetAppointmentBody = any


	/**
	 * Event Payload: Get a booking tier override for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-override', payload))
	*/
	export type IGetTierOverridePayload = any

	/**
	 * Event Response: Get a booking tier override for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierOverrideBody = { ... }
	*/
	export type IGetTierOverrideBody = any


	/**
	 * Event Payload: Updates categories
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-categories', payload))
	*/
	export type IUpdateCategoriesPayload = any

	/**
	 * Event Response: Updates categories
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateCategoriesBody = { ... }
	*/
	export type IUpdateCategoriesBody = any


	/**
	 * Event Payload: Cancels an appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:cancel-appointment', payload))
	*/
	export type ICancelAppointmentPayload = any

	/**
	 * Event Response: Cancels an appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICancelAppointmentBody = { ... }
	*/
	export type ICancelAppointmentBody = any


	/**
	 * Event Payload: Create a new appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-appointment', payload))
	*/
	export type ICreateAppointmentPayload = any

	/**
	 * Event Response: Create a new appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateAppointmentBody = { ... }
	*/
	export type ICreateAppointmentBody = any


	/**
	 * Event Payload: Get available times for a provider
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-provider-times', payload))
	*/
	export type IGetProviderTimesPayload = any

	/**
	 * Event Response: Get available times for a provider
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetProviderTimesBody = { ... }
	*/
	export type IGetProviderTimesBody = any


	/**
	 * Event Payload: Get all booking tier override for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-overrides', payload))
	*/
	export type IGetTierOverridesPayload = any

	/**
	 * Event Response: Get all booking tier override for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierOverridesBody = { ... }
	*/
	export type IGetTierOverridesBody = any


	/**
	 * Event Payload: Updates categories
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:set-category-items', payload))
	*/
	export type ISetCategoryItemsPayload = any

	/**
	 * Event Response: Updates categories
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ISetCategoryItemsBody = { ... }
	*/
	export type ISetCategoryItemsBody = any


	/**
	 * Event Payload: Update an appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-appointment', payload))
	*/
	export interface IUpdateAppointmentPayload {
		/** The appointment id */
		appointmentId?: string
	}

	/**
	 * Event Response: Update an appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateAppointmentBody = { ... }
	*/
	export interface IUpdateAppointmentBody {
		/** The id of the appointment that was updated */
		id?: string
	}


	/**
	 * Event Payload: Confirm an appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:confirm-appointment', payload))
	*/
	export type IConfirmAppointmentPayload = any

	/**
	 * Event Response: Confirm an appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IConfirmAppointmentBody = { ... }
	*/
	export type IConfirmAppointmentBody = any


	/**
	 * Event Payload: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-assignment', payload))
	*/
	export type IGetTierAssignmentPayload = any

	/**
	 * Event Response: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierAssignmentBody = { ... }
	*/
	export type IGetTierAssignmentBody = any


	/**
	 * Event Payload: Create a booking tier override for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-override', payload))
	*/
	export type ICreateTierOverridePayload = any

	/**
	 * Event Response: Create a booking tier override for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierOverrideBody = { ... }
	*/
	export type ICreateTierOverrideBody = any


	/**
	 * Event Payload: Delete a booking tier override for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-override', payload))
	*/
	export type IDeleteTierOverridePayload = any

	/**
	 * Event Response: Delete a booking tier override for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierOverrideBody = { ... }
	*/
	export type IDeleteTierOverrideBody = any


	/**
	 * Event Payload: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-assignments', payload))
	*/
	export type IGetTierAssignmentsPayload = any

	/**
	 * Event Response: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierAssignmentsBody = { ... }
	*/
	export type IGetTierAssignmentsBody = any


	/**
	 * Event Payload: Updates teammate info
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-teammate-info', payload))
	*/
	export type IUpdateTeammateInfoPayload = any

	/**
	 * Event Response: Updates teammate info
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTeammateInfoBody = { ... }
	*/
	export type IUpdateTeammateInfoBody = any


	/**
	 * Event Payload: Get a booking tier override for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-override', payload))
	*/
	export type IUpdateTierOverridePayload = any

	/**
	 * Event Response: Get a booking tier override for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierOverrideBody = { ... }
	*/
	export type IUpdateTierOverrideBody = any


	/**
	 * Event Payload: Create booking tier overrides for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-overrides', payload))
	*/
	export type ICreateTierOverridesPayload = any

	/**
	 * Event Response: Create booking tier overrides for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierOverridesBody = { ... }
	*/
	export type ICreateTierOverridesBody = any


	/**
	 * Event Payload: Delete booking tier overrides for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-overrides', payload))
	*/
	export type IDeleteTierOverridesPayload = any

	/**
	 * Event Response: Delete booking tier overrides for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierOverridesBody = { ... }
	*/
	export type IDeleteTierOverridesBody = any


	/**
	 * Event Payload: Gets user appointments
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-user-appointments', payload))
	*/
	export type IGetUserAppointmentsPayload = any

	/**
	 * Event Response: Gets user appointments
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetUserAppointmentsBody = { ... }
	*/
	export type IGetUserAppointmentsBody = any


	/**
	 * Event Payload: Updates multiple teammates order
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-teammate-order', payload))
	*/
	export type IUpdateTeammateOrderPayload = any

	/**
	 * Event Response: Updates multiple teammates order
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTeammateOrderBody = { ... }
	*/
	export type IUpdateTeammateOrderBody = any


	/**
	 * Event Payload: Update booking tier overrides for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-overrides', payload))
	*/
	export type IUpdateTierOverridesPayload = any

	/**
	 * Event Response: Update booking tier overrides for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierOverridesBody = { ... }
	*/
	export type IUpdateTierOverridesBody = any


	/**
	 * Event Payload: Create a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-assignment', payload))
	*/
	export type ICreateTierAssignmentPayload = any

	/**
	 * Event Response: Create a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierAssignmentBody = { ... }
	*/
	export type ICreateTierAssignmentBody = any


	/**
	 * Event Payload: Delete a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-assignment', payload))
	*/
	export type IDeleteTierAssignmentPayload = any

	/**
	 * Event Response: Delete a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierAssignmentBody = { ... }
	*/
	export type IDeleteTierAssignmentBody = any


	/**
	 * Event Payload: Triggered when an appointment has been updated
	 *
	 * The Booking (local) Skill emits this event. You'll receive a payload in your event handler (server/events/booking/did-update-appointment.ts)
	 * You'll create an event handler that receives this payload.
	 * Don't forget to subscribe to this event in config/eventContract.ts
	*/
	export interface IDidUpdateAppointmentPayload {
		/** The id of the appointment that was updated */
		id: string
		/** Test things */
		things?: {
			/** testing */
			one?: string
		}
		/** The guest ids */
		guestIds?: string[]
		/** The guest ids */
		guestIds2?: {
			/** Some thing... */
			something: string
		}[]
	}

	/**
	 * Event Response: Triggered when an appointment has been updated
	 *
	 * The Booking (local) Skill will respond to this event with this data in the body.
	*/
	export interface IDidUpdateAppointmentBody {
		/** Respond with &quot;success&quot; if your skill handled this event */
		status?: string
	}


	/**
	 * Event Payload: Update a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-assignment', payload))
	*/
	export type IUpdateTierAssignmentPayload = any

	/**
	 * Event Response: Update a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierAssignmentBody = { ... }
	*/
	export type IUpdateTierAssignmentBody = any


	/**
	 * Event Payload: Sets teammate as provider of service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-teammate-service', payload))
	*/
	export type ICreateTeammateServicePayload = any

	/**
	 * Event Response: Sets teammate as provider of service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTeammateServiceBody = { ... }
	*/
	export type ICreateTeammateServiceBody = any


	/**
	 * Event Payload: Create booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-assignments', payload))
	*/
	export type ICreateTierAssignmentsPayload = any

	/**
	 * Event Response: Create booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierAssignmentsBody = { ... }
	*/
	export type ICreateTierAssignmentsBody = any


	/**
	 * Event Payload: Sets teammate as provider of service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-teammate-service', payload))
	*/
	export type IDeleteTeammateServicePayload = any

	/**
	 * Event Response: Sets teammate as provider of service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTeammateServiceBody = { ... }
	*/
	export type IDeleteTeammateServiceBody = any


	/**
	 * Event Payload: Delete booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-assignments', payload))
	*/
	export type IDeleteTierAssignmentsPayload = any

	/**
	 * Event Response: Delete booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierAssignmentsBody = { ... }
	*/
	export type IDeleteTierAssignmentsBody = any


	/**
	 * Event Payload: Get available providers for a given date/time
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-available-providers', payload))
	*/
	export type IGetAvailableProvidersPayload = any

	/**
	 * Event Response: Get available providers for a given date/time
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetAvailableProvidersBody = { ... }
	*/
	export type IGetAvailableProvidersBody = any


	/**
	 * Event Payload: Update booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-assignments', payload))
	*/
	export type IUpdateTierAssignmentsPayload = any

	/**
	 * Event Response: Update booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierAssignmentsBody = { ... }
	*/
	export type IUpdateTierAssignmentsBody = any


	/**
	 * Event Payload: Create new appointments in bulk
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:bulk-create-appointments', payload))
	*/
	export type IBulkCreateAppointmentsPayload = any

	/**
	 * Event Response: Create new appointments in bulk
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IBulkCreateAppointmentsBody = { ... }
	*/
	export type IBulkCreateAppointmentsBody = any


	/**
	 * Event Payload: Cancels an appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:cancel-appointment-group', payload))
	*/
	export type ICancelAppointmentGroupPayload = any

	/**
	 * Event Response: Cancels an appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICancelAppointmentGroupBody = { ... }
	*/
	export type ICancelAppointmentGroupBody = any


	/**
	 * Event Payload: Gets appointments for a location
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-location-appointments', payload))
	*/
	export type IGetLocationAppointmentsPayload = any

	/**
	 * Event Response: Gets appointments for a location
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetLocationAppointmentsBody = { ... }
	*/
	export type IGetLocationAppointmentsBody = any


	/**
	 * Event Payload: Get available appointments
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-available-appointments', payload))
	*/
	export type IGetAvailableAppointmentsPayload = any

	/**
	 * Event Response: Get available appointments
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetAvailableAppointmentsBody = { ... }
	*/
	export type IGetAvailableAppointmentsBody = any


	/**
	 * Event Payload: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-assignment-category', payload))
	*/
	export type IGetTierAssignmentCategoryPayload = any

	/**
	 * Event Response: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierAssignmentCategoryBody = { ... }
	*/
	export type IGetTierAssignmentCategoryBody = any


	/**
	 * Event Payload: Get default appointment times
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-default-appointment-times', payload))
	*/
	export type IGetDefaultAppointmentTimesPayload = any

	/**
	 * Event Response: Get default appointment times
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetDefaultAppointmentTimesBody = { ... }
	*/
	export type IGetDefaultAppointmentTimesBody = any


	/**
	 * Event Payload: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-assignment-categories', payload))
	*/
	export type IGetTierAssignmentCategoriesPayload = any

	/**
	 * Event Response: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierAssignmentCategoriesBody = { ... }
	*/
	export type IGetTierAssignmentCategoriesBody = any


	/**
	 * Event Payload: Create a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-assignment-category', payload))
	*/
	export type ICreateTierAssignmentCategoryPayload = any

	/**
	 * Event Response: Create a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierAssignmentCategoryBody = { ... }
	*/
	export type ICreateTierAssignmentCategoryBody = any


	/**
	 * Event Payload: Delete a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-assignment-category', payload))
	*/
	export type IDeleteTierAssignmentCategoryPayload = any

	/**
	 * Event Response: Delete a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierAssignmentCategoryBody = { ... }
	*/
	export type IDeleteTierAssignmentCategoryBody = any


	/**
	 * Event Payload: Update a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-assignment-category', payload))
	*/
	export type IUpdateTierAssignmentCategoryPayload = any

	/**
	 * Event Response: Update a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierAssignmentCategoryBody = { ... }
	*/
	export type IUpdateTierAssignmentCategoryBody = any


	/**
	 * Event Payload: Confirms a selected appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:conversation-confirm-appointment', payload))
	*/
	export type IConversationConfirmAppointmentPayload = any

	/**
	 * Event Response: Confirms a selected appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IConversationConfirmAppointmentBody = { ... }
	*/
	export type IConversationConfirmAppointmentBody = any


	/**
	 * Event Payload: Sets overrides for a teammate service
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-teammate-service-override', payload))
	*/
	export type IUpdateTeammateServiceOverridePayload = any

	/**
	 * Event Response: Sets overrides for a teammate service
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTeammateServiceOverrideBody = { ... }
	*/
	export type IUpdateTeammateServiceOverrideBody = any


	/**
	 * Event Payload: Create booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:create-tier-assignment-categories', payload))
	*/
	export type ICreateTierAssignmentCategoriesPayload = any

	/**
	 * Event Response: Create booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTierAssignmentCategoriesBody = { ... }
	*/
	export type ICreateTierAssignmentCategoriesBody = any


	/**
	 * Event Payload: Delete booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-assignment-categories', payload))
	*/
	export type IDeleteTierAssignmentCategoriesPayload = any

	/**
	 * Event Response: Delete booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierAssignmentCategoriesBody = { ... }
	*/
	export type IDeleteTierAssignmentCategoriesBody = any


	/**
	 * Event Payload: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-tier-assignments-by-locations', payload))
	*/
	export type IGetTierAssignmentsByLocationsPayload = any

	/**
	 * Event Response: Get booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTierAssignmentsByLocationsBody = { ... }
	*/
	export type IGetTierAssignmentsByLocationsBody = any


	/**
	 * Event Payload: Update booking tier assignments for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:update-tier-assignment-categories', payload))
	*/
	export type IUpdateTierAssignmentCategoriesPayload = any

	/**
	 * Event Response: Update booking tier assignments for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTierAssignmentCategoriesBody = { ... }
	*/
	export type IUpdateTierAssignmentCategoriesBody = any


	/**
	 * Event Payload: Delete booking tier assignments for an org by location(s)
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:delete-tier-assignments-by-location', payload))
	*/
	export type IDeleteTierAssignmentsByLocationPayload = any

	/**
	 * Event Response: Delete booking tier assignments for an org by location(s)
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTierAssignmentsByLocationBody = { ... }
	*/
	export type IDeleteTierAssignmentsByLocationBody = any


	/**
	 * Event Payload: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:get-locations-with-tier-assignments', payload))
	*/
	export type IGetLocationsWithTierAssignmentsPayload = any

	/**
	 * Event Response: Get a booking tier assignment for an org
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetLocationsWithTierAssignmentsBody = { ... }
	*/
	export type IGetLocationsWithTierAssignmentsBody = any


	/**
	 * Event Payload: Returns choices for selecting an appointment
	 *
	 * The Booking (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('booking:conversation-get-upcoming-user-appointments-to-confirm', payload))
	*/
	export type IConversationGetUpcomingUserAppointmentsToConfirmPayload = any

	/**
	 * Event Response: Returns choices for selecting an appointment
	 *
	 * The Booking (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IConversationGetUpcomingUserAppointmentsToConfirmBody = { ... }
	*/
	export type IConversationGetUpcomingUserAppointmentsToConfirmBody = any


}


/** Scheduling */
export namespace SpruceEvents.scheduling {
	/** All available events  */
	export enum Events {
		/** Subscribe | Get users */
		GetUsers = 'get-users',

		/** Subscribe | Gets schedule patterns */
		GetPatterns = 'get-patterns',

		/** Subscribe | Get time off requests */
		GetTimeoffs = 'get-timeoffs',

		/** Subscribe | Gets schedule overrides */
		GetOverrides = 'get-overrides',

		/** Subscribe | Create a schedule pattern */
		CreatePattern = 'create-pattern',

		/** Subscribe | Create a time off request */
		CreateTimeoff = 'create-timeoff',

		/** Subscribe | Delete a schedule pattern */
		DeletePattern = 'delete-pattern',

		/** Subscribe | Delete a time off request */
		DeleteTimeoff = 'delete-timeoff',

		/** Subscribe | Get timeblocks */
		GetTimeblocks = 'get-timeblocks',

		/** Subscribe | Update a schedule pattern */
		UpdatePattern = 'update-pattern',

		/** Subscribe | Update a time off request */
		UpdateTimeoff = 'update-timeoff',

		/** Subscribe | Create a schedule override */
		CreateOverride = 'create-override',

		/** Subscribe | Delete a schedule override */
		DeleteOverride = 'delete-override',

		/** Subscribe | Update a schedule override */
		UpdateOverride = 'update-override',

		/** Subscribe | Delete timeblock */
		DeleteTimeblock = 'delete-timeblock',

		/** Subscribe | Update timeblock */
		UpdateTimeblock = 'update-timeblock',

		/** Subscribe | Create timeblocks */
		CreateTimeblocks = 'create-timeblocks',

		/** Subscribe | Get announcements */
		GetAnnouncements = 'get-announcements',

		/** Subscribe | Get teammate info */
		GetTeammateInfo = 'get-teammate-info',

		/** Subscribe | Get teammate info */
		SetTeammateInfo = 'set-teammate-info',

		/** Subscribe | Gets the location schedule */
		GetStoreSchedule = 'get-store-schedule',

		/** Subscribe | Sets the location schedule */
		SetStoreSchedule = 'set-store-schedule',

		/** Subscribe | Create announcement */
		CreateAnnouncement = 'create-announcement',

		/** Subscribe | Delete announcement */
		DeleteAnnouncement = 'delete-announcement',

		/** Subscribe | Gets teammate shifts */
		GetTeammateShifts = 'get-teammate-shifts',

		/** Subscribe | Sets teammate shifts */
		SetTeammateShifts = 'set-teammate-shifts',

		/** Subscribe | Create announcement */
		UpdateAnnouncement = 'update-announcement',

		/** Subscribe | Delete teammate shift */
		DeleteTeammateShift = 'delete-teammate-shift',

		/** Subscribe | Fetches a full team schedule at a location */
		GetTeammateSchedule = 'get-teammate-schedule',

		/** Subscribe | Gets the location schedule by date taking into account overrides */
		GetDailyStoreSchedule = 'get-daily-store-schedule',

		/** Subscribe | Get availabilities */
		GetTeammateAvailabilities = 'get-teammate-availabilities',

		/** Subscribe | Create teammate shift */
		CreateUpdateTeammateShift = 'create-update-teammate-shift',

		/** Subscribe | Delete availabilities */
		DeleteTeammateAvailability = 'delete-teammate-availability',

		/** Subscribe | Get the location schedule overrides */
		GetStoreScheduleOverrides = 'get-store-schedule-overrides',

		/** Subscribe | Get teammate shift overrides */
		GetTeammateShiftOverrides = 'get-teammate-shift-overrides',

		/** Subscribe | Create a location schedule override */
		CreateStoreScheduleOverride = 'create-store-schedule-override',

		/** Subscribe | Create teammate shift override */
		CreateTeammateShiftOverride = 'create-teammate-shift-override',

		/** Subscribe | Updates a location schedule override */
		DeleteStoreScheduleOverride = 'delete-store-schedule-override',

		/** Subscribe | Delete teammate shift override */
		DeleteTeammateShiftOverride = 'delete-teammate-shift-override',

		/** Subscribe | Updates a location schedule override */
		UpdateStoreScheduleOverride = 'update-store-schedule-override',

		/** Subscribe | Update teammate shift override */
		UpdateTeammateShiftOverride = 'update-teammate-shift-override',

		/** Subscribe | Bulk create teammate shifts */
		BulkCreateUpdateTeammateShift = 'bulk-create-update-teammate-shift',

		/** Subscribe | Create or update availability */
		CreateUpdateTeammateAvailability = 'create-update-teammate-availability'

	}

	/**
	 * Event Payload: Get users
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-users', payload))
	*/
	export type IGetUsersPayload = any

	/**
	 * Event Response: Get users
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetUsersBody = { ... }
	*/
	export type IGetUsersBody = any


	/**
	 * Event Payload: Gets schedule patterns
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-patterns', payload))
	*/
	export type IGetPatternsPayload = any

	/**
	 * Event Response: Gets schedule patterns
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetPatternsBody = { ... }
	*/
	export type IGetPatternsBody = any


	/**
	 * Event Payload: Get time off requests
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-timeoffs', payload))
	*/
	export type IGetTimeoffsPayload = any

	/**
	 * Event Response: Get time off requests
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTimeoffsBody = { ... }
	*/
	export type IGetTimeoffsBody = any


	/**
	 * Event Payload: Gets schedule overrides
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-overrides', payload))
	*/
	export type IGetOverridesPayload = any

	/**
	 * Event Response: Gets schedule overrides
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetOverridesBody = { ... }
	*/
	export type IGetOverridesBody = any


	/**
	 * Event Payload: Create a schedule pattern
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-pattern', payload))
	*/
	export type ICreatePatternPayload = any

	/**
	 * Event Response: Create a schedule pattern
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreatePatternBody = { ... }
	*/
	export type ICreatePatternBody = any


	/**
	 * Event Payload: Create a time off request
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-timeoff', payload))
	*/
	export type ICreateTimeoffPayload = any

	/**
	 * Event Response: Create a time off request
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTimeoffBody = { ... }
	*/
	export type ICreateTimeoffBody = any


	/**
	 * Event Payload: Delete a schedule pattern
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-pattern', payload))
	*/
	export type IDeletePatternPayload = any

	/**
	 * Event Response: Delete a schedule pattern
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeletePatternBody = { ... }
	*/
	export type IDeletePatternBody = any


	/**
	 * Event Payload: Delete a time off request
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-timeoff', payload))
	*/
	export type IDeleteTimeoffPayload = any

	/**
	 * Event Response: Delete a time off request
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTimeoffBody = { ... }
	*/
	export type IDeleteTimeoffBody = any


	/**
	 * Event Payload: Get timeblocks
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-timeblocks', payload))
	*/
	export type IGetTimeblocksPayload = any

	/**
	 * Event Response: Get timeblocks
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTimeblocksBody = { ... }
	*/
	export type IGetTimeblocksBody = any


	/**
	 * Event Payload: Update a schedule pattern
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-pattern', payload))
	*/
	export type IUpdatePatternPayload = any

	/**
	 * Event Response: Update a schedule pattern
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdatePatternBody = { ... }
	*/
	export type IUpdatePatternBody = any


	/**
	 * Event Payload: Update a time off request
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-timeoff', payload))
	*/
	export type IUpdateTimeoffPayload = any

	/**
	 * Event Response: Update a time off request
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTimeoffBody = { ... }
	*/
	export type IUpdateTimeoffBody = any


	/**
	 * Event Payload: Create a schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-override', payload))
	*/
	export type ICreateOverridePayload = any

	/**
	 * Event Response: Create a schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateOverrideBody = { ... }
	*/
	export type ICreateOverrideBody = any


	/**
	 * Event Payload: Delete a schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-override', payload))
	*/
	export type IDeleteOverridePayload = any

	/**
	 * Event Response: Delete a schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteOverrideBody = { ... }
	*/
	export type IDeleteOverrideBody = any


	/**
	 * Event Payload: Update a schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-override', payload))
	*/
	export type IUpdateOverridePayload = any

	/**
	 * Event Response: Update a schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateOverrideBody = { ... }
	*/
	export type IUpdateOverrideBody = any


	/**
	 * Event Payload: Delete timeblock
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-timeblock', payload))
	*/
	export type IDeleteTimeblockPayload = any

	/**
	 * Event Response: Delete timeblock
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTimeblockBody = { ... }
	*/
	export type IDeleteTimeblockBody = any


	/**
	 * Event Payload: Update timeblock
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-timeblock', payload))
	*/
	export type IUpdateTimeblockPayload = any

	/**
	 * Event Response: Update timeblock
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTimeblockBody = { ... }
	*/
	export type IUpdateTimeblockBody = any


	/**
	 * Event Payload: Create timeblocks
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-timeblocks', payload))
	*/
	export type ICreateTimeblocksPayload = any

	/**
	 * Event Response: Create timeblocks
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTimeblocksBody = { ... }
	*/
	export type ICreateTimeblocksBody = any


	/**
	 * Event Payload: Get announcements
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-announcements', payload))
	*/
	export type IGetAnnouncementsPayload = any

	/**
	 * Event Response: Get announcements
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetAnnouncementsBody = { ... }
	*/
	export type IGetAnnouncementsBody = any


	/**
	 * Event Payload: Get teammate info
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-teammate-info', payload))
	*/
	export type IGetTeammateInfoPayload = any

	/**
	 * Event Response: Get teammate info
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTeammateInfoBody = { ... }
	*/
	export type IGetTeammateInfoBody = any


	/**
	 * Event Payload: Get teammate info
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:set-teammate-info', payload))
	*/
	export type ISetTeammateInfoPayload = any

	/**
	 * Event Response: Get teammate info
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ISetTeammateInfoBody = { ... }
	*/
	export type ISetTeammateInfoBody = any


	/**
	 * Event Payload: Gets the location schedule
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-store-schedule', payload))
	*/
	export type IGetStoreSchedulePayload = any

	/**
	 * Event Response: Gets the location schedule
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetStoreScheduleBody = { ... }
	*/
	export type IGetStoreScheduleBody = any


	/**
	 * Event Payload: Sets the location schedule
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:set-store-schedule', payload))
	*/
	export type ISetStoreSchedulePayload = any

	/**
	 * Event Response: Sets the location schedule
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ISetStoreScheduleBody = { ... }
	*/
	export type ISetStoreScheduleBody = any


	/**
	 * Event Payload: Create announcement
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-announcement', payload))
	*/
	export type ICreateAnnouncementPayload = any

	/**
	 * Event Response: Create announcement
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateAnnouncementBody = { ... }
	*/
	export type ICreateAnnouncementBody = any


	/**
	 * Event Payload: Delete announcement
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-announcement', payload))
	*/
	export type IDeleteAnnouncementPayload = any

	/**
	 * Event Response: Delete announcement
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteAnnouncementBody = { ... }
	*/
	export type IDeleteAnnouncementBody = any


	/**
	 * Event Payload: Gets teammate shifts
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-teammate-shifts', payload))
	*/
	export type IGetTeammateShiftsPayload = any

	/**
	 * Event Response: Gets teammate shifts
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTeammateShiftsBody = { ... }
	*/
	export type IGetTeammateShiftsBody = any


	/**
	 * Event Payload: Sets teammate shifts
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:set-teammate-shifts', payload))
	*/
	export type ISetTeammateShiftsPayload = any

	/**
	 * Event Response: Sets teammate shifts
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ISetTeammateShiftsBody = { ... }
	*/
	export type ISetTeammateShiftsBody = any


	/**
	 * Event Payload: Create announcement
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-announcement', payload))
	*/
	export type IUpdateAnnouncementPayload = any

	/**
	 * Event Response: Create announcement
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateAnnouncementBody = { ... }
	*/
	export type IUpdateAnnouncementBody = any


	/**
	 * Event Payload: Delete teammate shift
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-teammate-shift', payload))
	*/
	export type IDeleteTeammateShiftPayload = any

	/**
	 * Event Response: Delete teammate shift
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTeammateShiftBody = { ... }
	*/
	export type IDeleteTeammateShiftBody = any


	/**
	 * Event Payload: Fetches a full team schedule at a location
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-teammate-schedule', payload))
	*/
	export type IGetTeammateSchedulePayload = any

	/**
	 * Event Response: Fetches a full team schedule at a location
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTeammateScheduleBody = { ... }
	*/
	export type IGetTeammateScheduleBody = any


	/**
	 * Event Payload: Gets the location schedule by date taking into account overrides
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-daily-store-schedule', payload))
	*/
	export type IGetDailyStoreSchedulePayload = any

	/**
	 * Event Response: Gets the location schedule by date taking into account overrides
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetDailyStoreScheduleBody = { ... }
	*/
	export type IGetDailyStoreScheduleBody = any


	/**
	 * Event Payload: Get availabilities
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-teammate-availabilities', payload))
	*/
	export type IGetTeammateAvailabilitiesPayload = any

	/**
	 * Event Response: Get availabilities
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTeammateAvailabilitiesBody = { ... }
	*/
	export type IGetTeammateAvailabilitiesBody = any


	/**
	 * Event Payload: Create teammate shift
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-update-teammate-shift', payload))
	*/
	export type ICreateUpdateTeammateShiftPayload = any

	/**
	 * Event Response: Create teammate shift
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateUpdateTeammateShiftBody = { ... }
	*/
	export type ICreateUpdateTeammateShiftBody = any


	/**
	 * Event Payload: Delete availabilities
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-teammate-availability', payload))
	*/
	export type IDeleteTeammateAvailabilityPayload = any

	/**
	 * Event Response: Delete availabilities
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTeammateAvailabilityBody = { ... }
	*/
	export type IDeleteTeammateAvailabilityBody = any


	/**
	 * Event Payload: Get the location schedule overrides
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-store-schedule-overrides', payload))
	*/
	export type IGetStoreScheduleOverridesPayload = any

	/**
	 * Event Response: Get the location schedule overrides
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetStoreScheduleOverridesBody = { ... }
	*/
	export type IGetStoreScheduleOverridesBody = any


	/**
	 * Event Payload: Get teammate shift overrides
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:get-teammate-shift-overrides', payload))
	*/
	export type IGetTeammateShiftOverridesPayload = any

	/**
	 * Event Response: Get teammate shift overrides
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IGetTeammateShiftOverridesBody = { ... }
	*/
	export type IGetTeammateShiftOverridesBody = any


	/**
	 * Event Payload: Create a location schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-store-schedule-override', payload))
	*/
	export type ICreateStoreScheduleOverridePayload = any

	/**
	 * Event Response: Create a location schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateStoreScheduleOverrideBody = { ... }
	*/
	export type ICreateStoreScheduleOverrideBody = any


	/**
	 * Event Payload: Create teammate shift override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-teammate-shift-override', payload))
	*/
	export type ICreateTeammateShiftOverridePayload = any

	/**
	 * Event Response: Create teammate shift override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateTeammateShiftOverrideBody = { ... }
	*/
	export type ICreateTeammateShiftOverrideBody = any


	/**
	 * Event Payload: Updates a location schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-store-schedule-override', payload))
	*/
	export type IDeleteStoreScheduleOverridePayload = any

	/**
	 * Event Response: Updates a location schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteStoreScheduleOverrideBody = { ... }
	*/
	export type IDeleteStoreScheduleOverrideBody = any


	/**
	 * Event Payload: Delete teammate shift override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:delete-teammate-shift-override', payload))
	*/
	export type IDeleteTeammateShiftOverridePayload = any

	/**
	 * Event Response: Delete teammate shift override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IDeleteTeammateShiftOverrideBody = { ... }
	*/
	export type IDeleteTeammateShiftOverrideBody = any


	/**
	 * Event Payload: Updates a location schedule override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-store-schedule-override', payload))
	*/
	export type IUpdateStoreScheduleOverridePayload = any

	/**
	 * Event Response: Updates a location schedule override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateStoreScheduleOverrideBody = { ... }
	*/
	export type IUpdateStoreScheduleOverrideBody = any


	/**
	 * Event Payload: Update teammate shift override
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:update-teammate-shift-override', payload))
	*/
	export type IUpdateTeammateShiftOverridePayload = any

	/**
	 * Event Response: Update teammate shift override
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IUpdateTeammateShiftOverrideBody = { ... }
	*/
	export type IUpdateTeammateShiftOverrideBody = any


	/**
	 * Event Payload: Bulk create teammate shifts
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:bulk-create-update-teammate-shift', payload))
	*/
	export type IBulkCreateUpdateTeammateShiftPayload = any

	/**
	 * Event Response: Bulk create teammate shifts
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: IBulkCreateUpdateTeammateShiftBody = { ... }
	*/
	export type IBulkCreateUpdateTeammateShiftBody = any


	/**
	 * Event Payload: Create or update availability
	 *
	 * The Scheduling (local) Skill listens for this event. You'll emit an event with this payload (ctx.sb.emit('scheduling:create-update-teammate-availability', payload))
	*/
	export type ICreateUpdateTeammateAvailabilityPayload = any

	/**
	 * Event Response: Create or update availability
	 *
	 * The Scheduling (local) Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: ICreateUpdateTeammateAvailabilityBody = { ... }
	*/
	export type ICreateUpdateTeammateAvailabilityBody = any


}


/** Scratch and Win (local) */
export namespace SpruceEvents.scratchWin {
	/** All available events  */
	export enum Events {
	}

}


/** Local Workspace */
export namespace SpruceEvents.workspace {
	/** All available events  */
	export enum Events {
	}

}

