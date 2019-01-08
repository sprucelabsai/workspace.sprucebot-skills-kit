// These are the base settings for your skill which are returned from the 'get-settings' event
module.exports = [
	// User settings page
	{
		title: 'General',
		page: 'skill_settings_user',
		cards: [
			{
				title: 'Appointment Stuff',
				fields: [
					{
						name: 'receive_notifications',
						type: 'boolean',
						// acls: {
						// 	core: ['can_manage_notifications'],
						// 	booking: ['can_do_something', 'can_do_something_else']
						// },
						props: {
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
						acls: {
							core: ['can_manage_notifications'],
							booking: ['can_do_something', 'can_do_something_else']
						},
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
	}
	// Location Settings page

	// Org Settings page
]
