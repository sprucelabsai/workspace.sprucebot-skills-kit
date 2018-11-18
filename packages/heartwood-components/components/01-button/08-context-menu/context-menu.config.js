const Classes = require('../../classes')

module.exports = {
	title: 'Context Menu',
	context: {
		leftAlign: true,
		actions: [
			{
				text: 'Edit Service',
				Classes: Classes
			},
			{
				text: 'Hide Service',
				Classes: Classes
			},
			{
				text: 'Move to Category',
				Classes: Classes
			}
		]
	}
}
