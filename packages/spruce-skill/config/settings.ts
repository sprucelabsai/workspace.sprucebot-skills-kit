import { SpruceSettingsFieldType } from '@sprucelabs/spruce-types'

const settings = [
	// User settings page
	{
		title: 'General', // This is the name of the tab on the settings page
		page: 'skill_settings_user', // This is the page where these settings should be displayed.
		id: 'general',
		sections: [
			// Array of cards to display on the page
			{
				title: 'Appointment Stuff', // The title of the card. Use this to group settings together
				fields: [
					// Array of individual settings that are configurable
					{
						name: 'receive_notifications', // Each setting MUST HAVE A UNIQUE "name"
						type: SpruceSettingsFieldType.Boolean, // The type of setting
						props: {
							// These props are passed directly to the component. Use it to customize the look and feel.
							label: 'Receive notifications',
							helper:
								'Opt in to receive notifications from this skill. The current org setting is {{enable_organization_notifications}}.',
							isSmall: true,
							iconBefore: 'caution',
							defaultValue: true,
							required: true,
							validate: {
								regex: '/[a-zA-Z].*/',
								msg: 'Please enter a string that starts with a letter'
							}
						}
					},
					{
						name: 'receive_notifications_or_something',
						type: SpruceSettingsFieldType.Select,
						props: {
							options: {
								foo: 'bar',
								bar: 'foo'
							},
							label: 'Receive notifications',
							helper:
								'Opt in to receive notifications from this skill. The current org setting is {{enable_organization_notifications}}.',
							isSmall: true,
							iconBefore: 'caution',
							defaultValue: true,
							required: true,
							validate: {
								regex: '/[a-zA-Z].*/',
								msg: 'Please enter a string that starts with a letter'
							}
						}
					}
				]
			}
		]
	},

	// Org skill settings
	{
		title: 'General',
		page: 'skill_settings_org',
		id: 'general',
		sections: [
			{
				title: 'Example Organization Settings Card',
				fields: [
					{
						name: 'example_boolean',
						type: SpruceSettingsFieldType.Boolean,
						// Only include this setting in get-settings event response if the user has these permissions:
						// acls: {
						// 	workspace: ['can_do_example_organization']
						// },
						props: {
							label: 'Example boolean',
							helper: 'This is an example of a boolean.',
							defaultValue: true
						}
					},
					{
						name: 'example_select',
						type: SpruceSettingsFieldType.Select,
						// Only include this setting in get-settings event response if the user has these permissions:
						// acls: {
						// 	workspace: ['can_do_example_organization']
						// },
						props: {
							options: {
								option1: 'Go Team',
								option2: 'No Go Team!'
							},
							label: 'Example select',
							helper: 'This is an example of a setting.'
						}
					},
					{
						name: 'example_duration',
						type: SpruceSettingsFieldType.Duration,
						props: {
							minMinutes: 5,
							maxMinutes: 60 * 5,
							label: 'Example duration',
							helper: 'This is an example of a setting that is a duration.'
						}
					},
					{
						name: 'example_text',
						type: SpruceSettingsFieldType.Text,
						// acls: {
						// 	workspace: ['can_do_example_organization']
						// },
						props: {
							label: 'Example text',
							helper: 'This is an example of a text setting.'
						}
					}
				]
			}
		]
	},
	// Location skill settings
	{
		title: 'General',
		page: 'skill_settings_location',
		id: 'general',
		sections: [
			{
				title: 'Example Location Settings Card',
				fields: [
					{
						name: 'location_example',
						type: SpruceSettingsFieldType.Boolean,
						// Only include this setting in get-settings event response if the user has these permissions:
						acls: {
							workspace: ['can_do_example_location']
						},
						props: {
							label: 'Example setting',
							helper: 'This is an example of a setting.',
							isSmall: true,
							iconBefore: 'caution',
							defaultValue: true,
							required: true
						}
					}
				]
			}
		]
	}
]

export default settings
