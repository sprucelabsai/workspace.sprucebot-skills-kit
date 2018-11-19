const Classes = require('../../classes')

module.exports = {
	title: 'Accordion',
	status: 'wip',
	context: {
		text: 'Hello',
		icon: 'test',
		text: 'TEST',
		buttonData: {
			text: 'Not hello',
			icon:
				'<path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/><path fill="none" d="M0,0h24v24H0V0z"/>'
		},
		items: [
			{
				text: 'Hello',
				panel: 'Hey look there is wayaaaaay more stuff in here'
			},
			{
				text: 'Style Consulting',
				panel: 'Advice on your gear'
			}
		]
	}
}
