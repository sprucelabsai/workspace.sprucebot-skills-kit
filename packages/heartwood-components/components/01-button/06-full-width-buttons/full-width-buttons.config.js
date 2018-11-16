const Classes = require('../button-classes')

module.exports = {
	title: 'Button Variations',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div>${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		text: 'Full Width Buttons',
		className: `${Classes.ButtonPrimary} ${Classes.Button_FullWidth}`,
		type: 'button'
	},
	variants: [
		{
			name: 'primary small',
			context: {
				className: `${Classes.ButtonPrimary} ${Classes.Button_Small} ${
					Classes.Button_FullWidth
				}`
			}
		},
		{
			name: 'secondary',
			context: {
				className: `${Classes.ButtonSecondary} ${Classes.Button_FullWidth}`
			}
		},
		{
			name: 'secondary small',
			context: {
				className: `${Classes.ButtonSecondary} ${Classes.Button_Small} ${
					Classes.Button_FullWidth
				}`
			}
		}
	]
}
