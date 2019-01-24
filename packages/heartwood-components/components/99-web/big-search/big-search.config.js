const defaultSearchActions = [
	{
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.8709 12.7801L8.77759 13.2226L9.21925 10.1284L17.1743 2.17345C17.9065 1.44121 19.0937 1.44121 19.8259 2.17345C20.5582 2.90568 20.5582 4.09288 19.8259 4.82511L11.8709 12.7801Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.29 3.05762L18.9417 5.70928" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
	}
]

const addIcon =
	'<path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>'
const searchIcon =
	'<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/>'

const image =
	'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=192&h=192&q=80'
const image2 =
	'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c6622d956bd3bb519516691c31141f4&auto=format&fit=crop&w=192&h=192&q=80'
const image3 =
	'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=214b5beac96f7d680a19b3836b28ccc3&auto=format&fit=crop&w=192&h=192&q=80'

module.exports = {
	title: 'Big Search',
	context: {
		view: 'search',
		placeholder: 'Search teammates…',
		searchInputIcon:
			'<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/>',
		showQuickAdd: true,
		searchContextBtnIcon: addIcon,
		searchListItems: [
			{
				type: 'people-list',
				parentClass: 'people-list',
				listHeaderTitle: 'Recent Searches',
				actions: [],
				items: [
					{
						title: 'Vicenta Maggio',
						subtitle: 'Last visited 2 hours ago',
						image,
						imageIsAvatar: true,
						actions: []
					},
					{
						title: 'Madaline Gibson',
						subtitle: 'Last visited 2 days ago',
						image: image2,
						imageIsAvatar: true,
						actions: []
					},
					{
						title: 'Katlynn Pouros',
						subtitle: 'Last visited 3 weeks ago',
						image: image3,
						imageIsAvatar: true,
						actions: []
					}
				]
			}
		]
	},
	variants: [
		{
			name: 'searching',
			label: 'Searching',
			context: {
				view: 'search',
				value: 'Vicenta',
				searchInputIcon:
					'<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/>',
				showQuickAdd: false,
				searchContextBtnIcon: searchIcon,
				searchListItems: [
					{
						type: 'people-list',
						parentClass: 'people-list',
						actions: [],
						items: [
							{
								title: 'Vicenta Maggio',
								subtitle: 'Last visited 2 hours ago',
								image,
								imageIsAvatar: true,
								actions: []
							},
							{
								title: 'Vicenta Ramirez',
								subtitle: 'Last visited 2 days ago',
								image: image2,
								imageIsAvatar: true,
								actions: []
							},
							{
								title: 'Allison Vicenta',
								subtitle: 'Last visited 3 weeks ago',
								image: image3,
								imageIsAvatar: true,
								actions: []
							}
						]
					}
				]
			}
		},
		{
			name: 'quick-add',
			label: 'Quick Add',
			context: {
				view: 'quick-add',
				title: 'Quick add guest',
				primaryAction: 'Add guest'
			}
		},
		{
			name: 'quick-add-name',
			label: 'Quick Add - Name',
			context: {
				view: 'quick-add',
				title: 'Quick add guest',
				existingUser: null,
				phoneNumberValue: '(555) 555-5555',
				primaryAction: 'Save',
				secondaryAction: 'Cancel'
			}
		},
		{
			name: 'quick-add-exists',
			label: 'Quick Add - Existing User',
			context: {
				view: 'quick-add',
				isCentered: true,
				title: 'Quick add guest',
				phoneNumberValue: '(555) 555-5555',
				existingUserMessage:
					'It looks like a user with that phone number already exists',
				existingUser: {
					firstName: 'Vicenta',
					lastName: 'Maggio',
					phoneNumber: '(555) 555-5555',
					jobTitle: 'Guest',
					image,
					imageIsAvatar: true,
					isLarge: true
				},
				primaryAction: 'Go to profile',
				secondaryAction: 'Cancel'
			}
		}
	]
}
