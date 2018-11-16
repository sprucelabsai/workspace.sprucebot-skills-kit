const Classes = require('../../classes')

module.exports = {
	title: 'Context Menu',
	context: {
		leftAlign: true,
		actions: [
			{
				text: 'Edit Service',
				className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
				Classes: Classes
			},
			{
				text: 'Hide Service',
				className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
				Classes: Classes
			},
			{
				text: 'Move to Category',
				className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
				Classes: Classes
			}
		]
	}
}
