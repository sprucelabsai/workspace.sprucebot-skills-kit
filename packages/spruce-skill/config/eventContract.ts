import { SpruceEvents } from '../server/interfaces/events-generated'

export default {
	/**
	 * Skill slugs with events you use in this skill. On boot, the event types will by sync'd to server/interfaces/events-generated.ts
	 * For example, you could get booking and scheduling event types with slugs: ['booking', 'scheduling']
	 */
	slugs: [],
	events: {
		[SpruceEvents.core.GetSettings.eventName]: {
			subscribe: true
		},
		[SpruceEvents.core.GetViews.eventName]: {
			subscribe: true
		},
		[SpruceEvents.core.GetUiEnhancements.eventName]: {
			subscribe: true
		}
	}
}
