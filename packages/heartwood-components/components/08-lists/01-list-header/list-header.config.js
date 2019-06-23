module.exports = {
	title: 'List Header',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		listHeaderTitle: 'Services'
	},
	variants: [
		{
			name: 'With Action',
			context: {
				listHeaderTitle: 'Services',
				actions: [
					{
						text: 'Change Order',
						class: 'btn-simple btn-small'
					}
				]
			}
		},
		{
			name: 'With Actions',
			context: {
				listHeaderTitle: 'Categories',
				actions: [
					{
						text: 'Cancel',
						class: 'btn-simple btn-small list-header__action-secondary'
					},
					{
						text: 'Done',
						class: 'btn-simple btn-small'
					}
				]
			}
		},
		{
			name: 'With Subtitle',
			context: {
				listHeaderTitle: 'Mar–Oct, 2018',
				listHeaderSubtitle: '1st and 3rd week'
			}
		},
		{
			name: 'With Subtitle and Actions',
			context: {
				listHeaderTitle: 'Team Schedule',
				listHeaderSubtitle: 'Mon, Sep 27',
				actions: [
					{
						text: 'Today',
						class: 'btn-simple btn-small'
					},
					{
						icon:
							'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M1.625 5.625C1.625 4.79657 2.29657 4.125 3.125 4.125H18.875C19.7034 4.125 20.375 4.79657 20.375 5.625V18.875C20.375 19.7034 19.7034 20.375 18.875 20.375H3.125C2.29657 20.375 1.625 19.7034 1.625 18.875V5.625Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M1.625 9.125H20.375" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M6.625 6V1.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M15.375 6V1.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.6875 12.25C5.51491 12.25 5.375 12.3899 5.375 12.5625C5.375 12.7351 5.51491 12.875 5.6875 12.875C5.86009 12.875 6 12.7351 6 12.5625C6 12.3899 5.86009 12.25 5.6875 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.6875 16.625C5.51491 16.625 5.375 16.7649 5.375 16.9375C5.375 17.1101 5.51491 17.25 5.6875 17.25C5.86009 17.25 6 17.1101 6 16.9375C6 16.7649 5.86009 16.625 5.6875 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 12.25C10.8274 12.25 10.6875 12.3899 10.6875 12.5625C10.6875 12.7351 10.8274 12.875 11 12.875C11.1726 12.875 11.3125 12.7351 11.3125 12.5625C11.3125 12.3899 11.1726 12.25 11 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 16.625C10.8274 16.625 10.6875 16.7649 10.6875 16.9375C10.6875 17.1101 10.8274 17.25 11 17.25C11.1726 17.25 11.3125 17.1101 11.3125 16.9375C11.3125 16.7649 11.1726 16.625 11 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.3125 12.25C16.1399 12.25 16 12.3899 16 12.5625C16 12.7351 16.1399 12.875 16.3125 12.875C16.4851 12.875 16.625 12.7351 16.625 12.5625C16.625 12.3899 16.4851 12.25 16.3125 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.3125 16.625C16.1399 16.625 16 16.7649 16 16.9375C16 17.1101 16.1399 17.25 16.3125 17.25C16.4851 17.25 16.625 17.1101 16.625 16.9375C16.625 16.7649 16.4851 16.625 16.3125 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						class: 'btn-simple btn-small'
					},
					{
						icon:
							'<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H20V20H0V0Z" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6666 9.16732H6.52492L11.1833 4.50898L9.99992 3.33398L3.33325 10.0007L9.99992 16.6673L11.1749 15.4923L6.52492 10.834H16.6666V9.16732V9.16732Z"/>',
						class: 'btn-simple btn-small'
					},
					{
						icon:
							'<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H20V20H0V0Z" fill="none"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99992 3.33398L8.82492 4.50898L13.4749 9.16732H3.33325V10.834H13.4749L8.82492 15.4923L9.99992 16.6673L16.6666 10.0007L9.99992 3.33398Z" />',
						class: 'btn-simple btn-small'
					}
				]
			}
		},
		{
			name: 'Small',
			context: {
				listHeaderTitle: 'Services',
				isSmall: true
			}
		}
	]
}
