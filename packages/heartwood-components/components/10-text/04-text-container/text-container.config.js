module.exports = {
	title: 'Text Container',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin: 3rem 0 0.5rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	preview: '@main-preview',
	variants: [
		{
			name: 'default',
			label: 'Text Container',
			context: {
				headingText: 'Text Container'
			}
		},
		{
			name: 'tight',
			label: 'Text Container - Tight Spacing',
			context: {
				modifierClass: 'text__container--spacing-tight',
				headingText: 'Text Container - Tight Spacing'
			}
		},
		{
			name: 'loose',
			label: 'Text Container - Loose Spacing',
			context: {
				modifierClass: 'text__container--spacing-loose',
				headingText: 'Text Container - Loose Spacing'
			}
		}
	]
}
