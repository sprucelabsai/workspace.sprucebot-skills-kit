const oneAction = [
	{
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.8709 12.7801L8.77759 13.2226L9.21925 10.1284L17.1743 2.17345C17.9065 1.44121 19.0937 1.44121 19.8259 2.17345C20.5582 2.90568 20.5582 4.09288 19.8259 4.82511L11.8709 12.7801Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.29 3.05762L18.9417 5.70928" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
	}
]

module.exports = {
	title: 'Settings List',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		parentClass: 'settings-list',
		listHeaderTitle: 'Categories',
		items: [
			{
				title: 'Barber',
				isSetting: true,
				toggleId: 'barber'
			},
			{
				title: 'Brow & Wax',
				isSetting: true,
				toggleId: 'brow-and-wax'
			},
			{
				title: 'Featured',
				isSetting: true,
				toggleId: 'featured'
			},
			{
				title: 'Gucci & Fire',
				isSetting: true,
				toggleId: 'gucci-and-fire'
			},
			{
				title: 'Style Consulting',
				isSetting: true,
				toggleId: 'style-consulting'
			}
		]
	},
	variants: [
		{
			name: 'With action',
			context: {
				listHeaderTitle: 'Category Settings',
				items: [
					{
						title: 'Hide this category',
						subtitle: 'Guests cannot book hidden services',
						isSetting: true,
						toggleId: 'hide'
					}
				]
			}
		},
		{
			name: 'Reminders',
			context: {
				listHeaderTitle: 'Reminders',
				items: [
					{
						title: 'Send me a reminder before each shift',
						isSetting: true,
						toggleId: 'before'
					},
					{
						title: 'Send me my schedule for the week every Sunday evening',
						isSetting: true,
						toggleId: 'sunday'
					},
					{
						title: 'Let me know when my schedule has changed',
						isSetting: true,
						toggleId: 'changed'
					},
					{
						title: "Send me the team's Schedule first thing in the morning",
						isSetting: true,
						toggleId: 'morning'
					},
					{
						title: "Notify me when a teammate's availability changes ",
						isSetting: true,
						toggleId: 'teammate'
					}
				]
			}
		},
		{
			name: 'Teammate Services',
			context: {
				listHeaderTitle: 'Serviecs',
				items: [
					{
						title: 'Beard Tinting',
						subtitle: '$20 | 40min',
						isSetting: true,
						toggleId: 'beard-tinting',
						actions: oneAction
					},
					{
						title: 'Hair Tinting',
						subtitle: '$30 | 40min',
						isSetting: true,
						toggleId: 'hair-tinting',
						actions: oneAction
					},
					{
						title: 'Shampoo',
						subtitle: '$7 | 30min',
						isSetting: true,
						toggleId: 'shampoo',
						actions: oneAction
					},
					{
						title: 'The Regular',
						subtitle: '$32.55 | 50min',
						isSetting: true,
						toggleId: 'the-regular',
						actions: oneAction
					},
					{
						title: 'Signature Follow-Up',
						subtitle: 'Free | 30min',
						isSetting: true,
						toggleId: 'signature-follow-up',
						actions: oneAction
					},
					{
						title: 'Young Spruce',
						subtitle: '$23 | 50min',
						isSetting: true,
						toggleId: 'young-spruce',
						actions: oneAction
					},
					{
						title: 'Signature',
						subtitle: '$40 | 1hr 5min',
						isSetting: true,
						toggleId: 'signature',
						actions: oneAction
					},
					{
						title: 'Clean Up',
						subtitle: '$20 | 35min',
						isSetting: true,
						toggleId: 'clean-up',
						actions: oneAction
					}
				]
			}
		}
	]
}
