const Classes = require('../../classes')

module.exports = {
	title: 'Small Buttons',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		text: 'Small Buttons',
		className: `${Classes.ButtonPrimary} ${Classes.Button_Small}`,
		type: 'button'
	},
	variants: [
		{
			name: 'secondary',
			context: {
				className: `${Classes.ButtonSecondary} ${Classes.Button_Small}`
			}
		}
	]
}
