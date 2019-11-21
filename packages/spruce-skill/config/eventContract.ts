import { SpruceDataTypes } from '@sprucelabs/spruce-types'
import { SpruceEvents } from '../server/interfaces/events-generated'

export default {
	/**
	 * Skill slugs with events you use in this skill. On boot, the event types will by sync'd to server/interfaces/events-generated.ts
	 * For example, you could get booking and scheduling event types with slugs: ['booking', 'scheduling']
	 */
	slugs: [],
	events: {
		// Define the events for your skill
		'workspace:my-event': {
			description:
				'Example event definition. The corresponding event handler for this file would go in server/events/workspace/my-event.ts',
			// If this is an event we're listening for, we set subscribe=true
			subscribe: true,
			// Payload describes the data that should be sent to your event handler
			payload: {
				myVar: {
					type: SpruceDataTypes.String,
					description: 'A required string variable.',
					isRequired: true
				}
			},
			// Body is the data that describes the data you'll respond with from your event handler
			body: {
				status: {
					type: SpruceDataTypes.String,
					description: 'If everything went ok, this will be set to "success"',
					isRequired: true
				},
				randomPeople: {
					description: 'Array of randomly generated people',
					type: SpruceDataTypes.Array,
					isRequired: true,
					items: {
						personNum: {
							type: SpruceDataTypes.Number,
							description: 'A number representing something about this person',
							isRequired: true
						},
						firstName: {
							type: SpruceDataTypes.String,
							description: 'A random first name',
							isRequired: true
						},
						lastName: {
							type: SpruceDataTypes.String,
							description: 'A random first name',
							isRequired: true
						},
						// Notice that this is not required
						childNames: {
							description: "A random array of this person's children's names",
							type: SpruceDataTypes.Array,
							items: SpruceDataTypes.String
						}
					}
				}
			}
		},
		// You can subscribe to events from core or other skills
		[SpruceEvents.core.GetSettings.name]: {
			subscribe: true
		},
		[SpruceEvents.core.GetViews.name]: {
			subscribe: true
		},
		[SpruceEvents.core.GetUiEnhancements.name]: {
			subscribe: true
		}
	}
}
