import { ISpruceSchema,SpruceSchemaFieldType } from '@sprucelabs/spruce-types'
// import {SpruceEvents} from '../interfaces/events-generated'

const contract:{
	events: {
		[eventName: string]: {
			subscribe?: boolean
			description: string
			payload: ISpruceSchema
			body: ISpruceSchema
		}
	}
 } = {


	/**
	 * Skill slugs with events you use in this skill. On boot, the event types will by sync'd to server/interfaces/events-generated.ts
	 * For example, you could get booking and scheduling event types with slugs: ['booking', 'scheduling']
	 */
	// slugs: [],
	events: {
		// Define the events for your skill
		'workspace:my-event': {
			description:
				'Example event definition. The corresponding event handler for this file would go in server/events/workspace/my-event.ts',
			// If this is an event we're listening for, we set subscribe=true
			subscribe: true,
			// Payload describes the data that should be sent to your event handler
			payload: {
				id: 'my-event-payload',
				fields: {
					myVar: {
						type: SpruceSchemaFieldType.Schema,
						hint: 'A required string variable.',
						isRequired: true,
						options: {
							// <slug>_<id>
							schemaId: 'workspace_example'
						}
					}
				}
			},
			// Body is the data that describes the data you'll respond with from your event handler
			body: {

			}
		}
	}
}

export default contract