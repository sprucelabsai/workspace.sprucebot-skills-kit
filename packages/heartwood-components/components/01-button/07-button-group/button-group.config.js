const Classes = require('../../classes')

module.exports = {
	title: 'Action List',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="padding: 2rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		actions: [
			{
				text: 'Confirm Changes',
				className: Classes.ButtonPrimary,
				Classes: Classes
			},
			{
				text: 'Cancel',
				className: Classes.ButtonSecondary,
				Classes: Classes
			}
		]
	},
	variants: [
		{
			name: 'Segmented',
			context: {
				isSegmented: true,
				actions: [
					{
						text: 'Option One',
						className: Classes.ButtonSecondary,
						Classes: Classes
					},
					{
						text: 'Option Two',
						className: Classes.ButtonSecondary,
						Classes: Classes
					},
					{
						text: 'Option Three',
						className: Classes.ButtonSecondary,
						Classes: Classes
					}
				]
			}
		},
		{
			name: 'Floating',
			context: {
				isFloating: true,
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
	]
}
