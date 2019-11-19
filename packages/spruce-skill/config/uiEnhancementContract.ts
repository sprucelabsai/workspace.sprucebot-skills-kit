import { SpruceDataTypes } from '@sprucelabs/spruce-types'

export default {
	// Defines the views / areas that booking will accept UI enhancements
	provides: {
		// Each key is the name of a view that accepts showing UI enhancements
		'mySkillSlug:my-view': {
			sections: [
				{
					// Array of sections that are available for enhancements
					id: 'guest', // The unique section id
					description: 'Information about the guest.' // A developer-friendly description
				},
				{
					id: 'otherSection',
					description: 'Some other section'
				}
			],
			payload: {
				// The payload data that will be provided to other skills when this view loads
				guestId: {
					type: SpruceDataTypes.String,
					description:
						'The id of the guest (User) who has been selected for the appointment'
				},
				services: {
					type: SpruceDataTypes.Array,
					description: 'An array of the selected services',
					items: {
						// Each item in the list has these properties
						id: {
							type: SpruceDataTypes.String,
							description: 'The id of the Service'
						},
						name: {
							type: SpruceDataTypes.String,
							description: 'The name of the Service'
						},
						teammateId: {
							type: SpruceDataTypes.String,
							description:
								'The id of the teammate (User) who provides the service for the appointment'
						}
					}
				}
			}
		}
	},
	// Defines views in web or other skills that booking will
	enhances: {
		// Each key is the name of a view in another skill that booking will supplement with enhancement(s)
		'workspace:example-view': [
			{
				id: 'mySkillSlug:my-enhancement1', // A unique id for this UI enhancement
				sectionId: 'guest' // The section that we're enhancing
			},
			{
				id: 'mySkillSlug:my-enhancement2',
				sectionId: 'guest'
			}
		]
	}
}
