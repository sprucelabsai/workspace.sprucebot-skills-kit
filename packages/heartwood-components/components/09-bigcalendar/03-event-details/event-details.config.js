const Classes = require('../../classes')

const editAction = [
	{
		icon:
			'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8707 12.7799L8.77734 13.2224L9.21901 10.1282L17.174 2.1732C17.9062 1.44096 19.0934 1.44096 19.8257 2.1732C20.5579 2.90544 20.5579 4.09263 19.8257 4.82487L11.8707 12.7799Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.29 3.05762L18.9417 5.70928"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		iconClass: 'btn__line-icon'
	}
]

const personAction = [
	{
		icon:
			'<path fill-rule="evenodd" clip-rule="evenodd" d="M3.8125 12.207C5.02062 12.207 6 11.2277 6 10.0195C6 8.81141 5.02062 7.83203 3.8125 7.83203C2.60438 7.83203 1.625 8.81141 1.625 10.0195C1.625 11.2277 2.60438 12.207 3.8125 12.207Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.1875 12.207C19.3956 12.207 20.375 11.2277 20.375 10.0195C20.375 8.81141 19.3956 7.83203 18.1875 7.83203C16.9794 7.83203 16 8.81141 16 10.0195C16 11.2277 16.9794 12.207 18.1875 12.207Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 12.207C12.2081 12.207 13.1875 11.2277 13.1875 10.0195C13.1875 8.81141 12.2081 7.83203 11 7.83203C9.79188 7.83203 8.8125 8.81141 8.8125 10.0195C8.8125 11.2277 9.79188 12.207 11 12.207Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		iconClass: 'btn__line-icon'
	}
]

const serviceActions = [
	{
		icon:
			'<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8337 5.83366H9.16699V9.16699H5.83366V10.8337H9.16699V14.167H10.8337V10.8337H14.167V9.16699H10.8337V5.83366V5.83366ZM10.0003 1.66699C5.40033 1.66699 1.66699 5.40033 1.66699 10.0003C1.66699 14.6003 5.40033 18.3337 10.0003 18.3337C14.6003 18.3337 18.3337 14.6003 18.3337 10.0003C18.3337 5.40033 14.6003 1.66699 10.0003 1.66699V1.66699ZM10.0003 16.667C6.32533 16.667 3.33366 13.6753 3.33366 10.0003C3.33366 6.32533 6.32533 3.33366 10.0003 3.33366C13.6753 3.33366 16.667 6.32533 16.667 10.0003C16.667 13.6753 13.6753 16.667 10.0003 16.667V16.667Z"/>'
	},
	{
		icon:
			'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8707 12.7799L8.77734 13.2224L9.21901 10.1282L17.174 2.1732C17.9062 1.44096 19.0934 1.44096 19.8257 2.1732C20.5579 2.90544 20.5579 4.09263 19.8257 4.82487L11.8707 12.7799Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.29 3.05762L18.9417 5.70928"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		iconClass: 'btn__line-icon'
	}
]

module.exports = {
	title: 'Event Details',
	context: {
		eventClass: 'event-confirmed',
		label: 'Appointment',
		title: 'Cooper Moore',
		contextMenu: {
			actions: [
				{
					text: 'Edit Service',
					className: 'btn-simple btn-full-width'
				},
				{
					text: 'Hide Service',
					className: 'btn-simple btn-full-width'
				},
				{
					text: 'Move to Category',
					className: 'btn-simple btn-full-width'
				}
			]
		},
		canGoBack: true,
		items: [
			{
				image:
					'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
				imageIsAvatar: true,
				width: 40,
				height: 40,
				alt: 'Cooper Moore',
				title: 'Cooper Moore',
				subtitle: '(364) 106-7572',
				actions: personAction
			},
			{
				image:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8707 16.5299L8.77734 16.9715L9.21901 13.8782L17.174 5.9232C17.9062 5.19096 19.0934 5.19096 19.8257 5.9232C20.5579 6.65544 20.5579 7.84263 19.8257 8.57487L11.8707 16.5299Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.375 2.37402C5.375 1.95981 5.71079 1.62402 6.125 1.62402H10.875C11.2892 1.62402 11.625 1.95981 11.625 2.37402V3.37402C11.625 3.78824 11.2892 4.12402 10.875 4.12402H6.125C5.71079 4.12402 5.375 3.78824 5.375 3.37402V2.37402Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.625 2.87402H14.125C14.8154 2.87402 15.375 3.43367 15.375 4.12402"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.375 16.624V19.124C15.375 19.8144 14.8154 20.374 14.125 20.374H2.875C2.18464 20.374 1.625 19.8144 1.625 19.124V4.12402C1.625 3.43367 2.18464 2.87402 2.875 2.87402H5.375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.375 7.87402H11.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.375 11.624H7.875"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
				iconClass: 'list-item__icon u-icon__no-fill u-icon__stroke',
				imageIsIcon: true,
				width: 20,
				height: 20,
				title: 'Prefers products that aren’t tested on animals.',
				subtitle: 'Caleigh Jerde, 4 months ago',
				actions: editAction
			},
			{
				image:
					'<path d="M6.625 11.625H7.25C7.59518 11.625 7.875 11.9048 7.875 12.25V16.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.625 16.625H9.125"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5264 11.625H14.1247C14.3293 11.6259 14.5206 11.7269 14.6369 11.8953C14.7531 12.0637 14.7797 12.2783 14.708 12.47L13.1497 16.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 5.625C1.625 4.79657 2.29657 4.125 3.125 4.125H18.875C19.7034 4.125 20.375 4.79657 20.375 5.625V18.875C20.375 19.7034 19.7034 20.375 18.875 20.375H3.125C2.29657 20.375 1.625 19.7034 1.625 18.875V5.625Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.625 9.125H20.375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.625 6V1.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.375 6V1.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
				iconClass: 'list-item__icon u-icon__no-fill u-icon__stroke',
				imageIsIcon: true,
				width: 20,
				height: 20,
				title: 'Mon, Oct 27, 2018',
				subtitle: '9–10:30am'
			},
			{
				image:
					'<path d="M7.875 4.12305H20.375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.875 11.623H20.375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.875 19.123H20.375"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 2.37305C1.625 1.95883 1.96079 1.62305 2.375 1.62305H4.625C5.03921 1.62305 5.375 1.95883 5.375 2.37305V4.62305C5.375 5.03726 5.03921 5.37305 4.625 5.37305H2.375C1.96079 5.37305 1.625 5.03726 1.625 4.62305V2.37305Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 9.87305C1.625 9.45883 1.96079 9.12305 2.375 9.12305H4.625C5.03921 9.12305 5.375 9.45883 5.375 9.87305V12.123C5.375 12.5373 5.03921 12.873 4.625 12.873H2.375C1.96079 12.873 1.625 12.5373 1.625 12.123V9.87305Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 17.373C1.625 16.9588 1.96079 16.623 2.375 16.623H4.625C5.03921 16.623 5.375 16.9588 5.375 17.373V19.623C5.375 20.0373 5.03921 20.373 4.625 20.373H2.375C1.96079 20.373 1.625 20.0373 1.625 19.623V17.373Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
				iconClass: 'list-item__icon u-icon__no-fill u-icon__stroke',
				imageIsIcon: true,
				width: 20,
				height: 20,
				title: 'Services',
				subtitle: '<p>Beard Tinting</p><p>Head Shave</p><p>$42 | 1hr 30min</p>',
				actions: serviceActions
			},
			{
				image:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.375C14.1421 20.375 17.5 17.0171 17.5 12.875C17.5 8.73286 14.1421 5.375 10 5.375C5.85786 5.375 2.5 8.73286 2.5 12.875C2.5 17.0171 5.85786 20.375 10 20.375Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7.25L16.5625 5.6875"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.25 5.375L16.875 6"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5.375V1.625"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.875 1.625H8.125"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 13.5002L6.875 10.041"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
				iconClass: 'list-item__icon u-icon__no-fill u-icon__stroke',
				imageIsIcon: true,
				width: 20,
				height: 20,
				title: 'Status',
				subtitle: 'Not Checked In',
				actions: editAction
			}
		],
		primaryCTA: 'Check guest in'
	}
}
