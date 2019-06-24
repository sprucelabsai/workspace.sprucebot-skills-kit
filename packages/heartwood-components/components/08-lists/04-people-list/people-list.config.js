const oneAction = [
	{
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.8709 12.7801L8.77759 13.2226L9.21925 10.1284L17.1743 2.17345C17.9065 1.44121 19.0937 1.44121 19.8259 2.17345C20.5582 2.90568 20.5582 4.09288 19.8259 4.82511L11.8709 12.7801Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.29 3.05762L18.9417 5.70928" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
	}
]
const noteActions = [
	{
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.8708 16.5301L8.7775 16.9718L9.21916 13.8784L17.1742 5.92345C17.9064 5.19121 19.0936 5.19121 19.8258 5.92345C20.5581 6.65568 20.5581 7.84288 19.8258 8.57511L11.8708 16.5301Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M5.375 2.37427C5.375 1.96005 5.71079 1.62427 6.125 1.62427H10.875C11.2892 1.62427 11.625 1.96005 11.625 2.37427V3.37427C11.625 3.78848 11.2892 4.12427 10.875 4.12427H6.125C5.71079 4.12427 5.375 3.78848 5.375 3.37427V2.37427Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M11.625 2.87427H14.125C14.8154 2.87427 15.375 3.43391 15.375 4.12427" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M15.375 16.6243V19.1243C15.375 19.8146 14.8154 20.3743 14.125 20.3743H2.875C2.18464 20.3743 1.625 19.8146 1.625 19.1243V4.12427C1.625 3.43391 2.18464 2.87427 2.875 2.87427H5.375" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.375 7.87427H11.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.375 11.6243H7.875" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		width: '22',
		height: '22'
	}
]

const image =
	'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=192&h=192&q=80'
const image2 =
	'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c6622d956bd3bb519516691c31141f4&auto=format&fit=crop&w=192&h=192&q=80'
const image3 =
	'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=214b5beac96f7d680a19b3836b28ccc3&auto=format&fit=crop&w=192&h=192&q=80'

module.exports = {
	title: 'People List',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		parentClass: 'people-list',
		listHeaderTitle: 'Team Schedule',
		listHeaderSubtitle: 'Mon, Sep 27',
		actions: [
			{
				text: 'Today',
				class: 'btn-simple btn-small'
			},
			{
				icon:
					'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M1.625 5.625C1.625 4.79657 2.29657 4.125 3.125 4.125H18.875C19.7034 4.125 20.375 4.79657 20.375 5.625V18.875C20.375 19.7034 19.7034 20.375 18.875 20.375H3.125C2.29657 20.375 1.625 19.7034 1.625 18.875V5.625Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M1.625 9.125H20.375" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M6.625 6V1.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M15.375 6V1.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.6875 12.25C5.51491 12.25 5.375 12.3899 5.375 12.5625C5.375 12.7351 5.51491 12.875 5.6875 12.875C5.86009 12.875 6 12.7351 6 12.5625C6 12.3899 5.86009 12.25 5.6875 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.6875 16.625C5.51491 16.625 5.375 16.7649 5.375 16.9375C5.375 17.1101 5.51491 17.25 5.6875 17.25C5.86009 17.25 6 17.1101 6 16.9375C6 16.7649 5.86009 16.625 5.6875 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M11 12.25C10.8274 12.25 10.6875 12.3899 10.6875 12.5625C10.6875 12.7351 10.8274 12.875 11 12.875C11.1726 12.875 11.3125 12.7351 11.3125 12.5625C11.3125 12.3899 11.1726 12.25 11 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M11 16.625C10.8274 16.625 10.6875 16.7649 10.6875 16.9375C10.6875 17.1101 10.8274 17.25 11 17.25C11.1726 17.25 11.3125 17.1101 11.3125 16.9375C11.3125 16.7649 11.1726 16.625 11 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.3125 12.25C16.1399 12.25 16 12.3899 16 12.5625C16 12.7351 16.1399 12.875 16.3125 12.875C16.4851 12.875 16.625 12.7351 16.625 12.5625C16.625 12.3899 16.4851 12.25 16.3125 12.25" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.3125 16.625C16.1399 16.625 16 16.7649 16 16.9375C16 17.1101 16.1399 17.25 16.3125 17.25C16.4851 17.25 16.625 17.1101 16.625 16.9375C16.625 16.7649 16.4851 16.625 16.3125 16.625" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
				class: 'btn-simple btn-small'
			},
			{
				icon:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6667 9.16658H6.52499L11.1833 4.50825L9.99999 3.33325L3.33333 9.99992L9.99999 16.6666L11.175 15.4916L6.52499 10.8333H16.6667V9.16658V9.16658Z"/>',
				class: 'btn-simple btn-small'
			},
			{
				icon:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.33325L8.825 4.50825L13.475 9.16658H3.33334V10.8333H13.475L8.825 15.4916L10 16.6666L16.6667 9.99992L10 3.33325Z"/>',
				class: 'btn-simple btn-small'
			}
		],
		items: [
			{
				title: 'Vicenta Maggio',
				subtitle: '7am–5pm, Break: 2–3:25pm',
				image,
				imageIsAvatar: true,
				actions: oneAction
			},
			{
				title: 'Madaline Gibson',
				subtitle: '9am–6pm, Break: 12–1pm',
				image: image2,
				imageIsAvatar: true,
				actions: oneAction
			},
			{
				title: 'Katlynn Pouros',
				subtitle: '9am–5pm',
				image: image3,
				imageIsAvatar: true,
				actions: oneAction
			}
		]
	},
	variants: [
		{
			name: 'Subtitles',
			context: {
				listHeaderTitle: 'Team Schedule',
				listHeaderSubtitle: null,
				actions: null,
				bottext:
					'This is where  you can manage your team’s availability and schedule.',
				items: [
					{
						title: 'Vicenta Maggio',
						subtitle: 'Has 1 override, setup availability and schedule.',
						image,
						imageIsAvatar: true,
						actions: oneAction
					},
					{
						title: 'Madaline Gibson',
						subtitle: 'Has 1 block, setup availability and a few schedules.',
						image: image2,
						imageIsAvatar: true,
						actions: oneAction
					},
					{
						title: 'Katlynn Pouros',
						subtitle: 'Has a schedule.',
						image: image3,
						imageIsAvatar: true,
						actions: oneAction
					}
				]
			}
		},
		{
			name: 'Notes',
			context: {
				listHeaderTitle: 'Notes',
				listHeaderSubtitle: null,
				actions: null,
				tabs: [
					{
						text: 'Guests',
						isCurrent: true
					},
					{
						text: 'Team'
					},
					{
						text: 'Settings'
					}
				],
				items: [
					{
						title: 'Autumn Jacobi',
						subtitle: 'No Notes',
						image: '../../images/user-placeholder.png',
						imageIsAvatar: true,
						showIndicator: true,
						actions: noteActions
					},
					{
						title: 'Dylan Moore',
						subtitle: 'No Notes',
						image: '../../images/user-placeholder.png',
						imageIsAvatar: true,
						showIndicator: true,
						actions: noteActions
					},
					{
						title: 'Genoveva Leannon',
						subtitle: 'No Notes',
						image: '../../images/user-placeholder.png',
						imageIsAvatar: true,
						showIndicator: true,
						actions: noteActions
					}
				]
			}
		}
	]
}
