// These are the base settings for your skill which are returned from the 'get-settings' event

/*
Valid "page" types:
skill_settings_user
skill_settings_user_org
skill_settings_user_location
skill_settings_org
skill_settings_location
*/

module.exports = [
	// User settings page
	{
		title: 'General', // This is the name of the tab on the settings page
		page: 'skill_settings_user', // This is the page where these settings should be displayed.
		cards: [
			// Array of cards to display on the page
			{
				title: 'Appointment Stuff', // The title of the card. Use this to group settings together
				fields: [
					// Array of individual settings that are configurable
					{
						name: 'receive_notifications', // Each setting MUST HAVE A UNIQUE "name"
						type: 'boolean', // The type of setting
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
						type: 'select',
						props: {
							options: [
								{
									label: 'Taylor',
									value: 'blah blah blah'
								}
							],
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
	// User Org settings
	{
		title: 'General',
		page: 'skill_settings_user_org',
		cards: [
			{
				title: 'Example User Organization Settings Card',
				fields: [
					{
						name: 'user_org_example',
						type: 'boolean',
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
	},
	// User location settings
	{
		title: 'General',
		page: 'skill_settings_user_location',
		cards: [
			{
				title: 'Example User Location Settings Card',
				fields: [
					{
						name: 'user_location_example',
						type: 'boolean',
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
	},
	// Org settings
	{
		title: 'General',
		page: 'skill_settings_org',
		cards: [
			{
				title: 'Example Organization Settings Card',
				fields: [
					{
						name: 'org_example',
						type: 'boolean',
						// Only include this setting in get-settings event response if the user has these permissions:
						acls: {
							workspace: ['can_do_example_organization']
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
	},
	// Location settings
	{
		title: 'General',
		page: 'skill_settings_location',
		cards: [
			{
				title: 'Example Location Settings Card',
				fields: [
					{
						name: 'location_example',
						type: 'boolean',
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
