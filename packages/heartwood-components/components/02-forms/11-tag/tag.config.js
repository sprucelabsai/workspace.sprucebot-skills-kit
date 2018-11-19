const Classes = require('../../classes')

module.exports = {
	title: 'Tag',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		tagText: 'Spruced Up Shave',
		class: Classes.TagPrimary
	},
	variants: [
		{
			name: 'Small',
			context: {
				isSmall: true
			}
		},
		{
			name: 'Secondary',
			context: {
				class: Classes.TagSecondary
			}
		},
		{
			name: 'Secondary Small',
			context: {
				class: Classes.TagSecondary,
				isSmall: true
			}
		}
	]
}
