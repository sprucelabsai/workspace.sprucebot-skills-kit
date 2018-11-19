const Classes = require('../../../classes')

module.exports = {
	title: 'Onboarding Card',
	context: {
		tabs: [
			{
				text: 'Add your first location',
				tabIcon:
					'<path fill="none" d="M6 13.2231L8.45 16.7001C8.63855 16.9818 8.95158 17.155 9.29037 17.1651C9.62916 17.1752 9.95197 17.021 10.157 16.7511L18 6.82812" stroke="#00B2A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M12 23.249C18.2132 23.249 23.25 18.2122 23.25 11.999C23.25 5.78582 18.2132 0.749023 12 0.749023C5.7868 0.749023 0.75 5.78582 0.75 11.999C0.75 18.2122 5.7868 23.249 12 23.249Z" stroke="#00B2A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
			},
			{
				text: 'Set up your team',
				tabIcon:
					'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M21 10.063C21 16.29 13.879 22.121 12.305 23.333C12.1252 23.4714 11.8748 23.4714 11.695 23.333C10.122 22.122 3 16.29 3 10.063C3 4.81699 6.753 0.562988 12 0.562988C17.247 0.562988 21 4.81699 21 10.063Z" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12 6.06299V15.063" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.5 10.563H7.5" stroke="#737780" stroke-linecap="round" stroke-linejoin="round"/>',
				isCurrent: true
			},
			{
				text: 'Go live',
				tabIcon:
					'<path fill="none" d="M12 1.49805V11.248" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M9 5.01123C4.86736 6.47234 2.38839 10.6982 3.12962 15.0184C3.87085 19.3386 7.61668 22.4965 12 22.4965C16.3833 22.4965 20.1292 19.3386 20.8704 15.0184C21.6116 10.6982 19.1326 6.47234 15 5.01123" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
			}
		],
		title: 'Add your teammates and their info',
		children:
			'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
		footerActions: [
			{
				text: 'Add teammates',
				className: 'btn-primary'
			}
		]
	}
}
