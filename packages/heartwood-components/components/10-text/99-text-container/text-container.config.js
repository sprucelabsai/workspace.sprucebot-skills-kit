module.exports = {
	title: 'Text Container',
	status: 'wip',
	collated: true,
	collator(markup, item) {
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
				modifierClass: 'text-container--spacing-tight',
				headingText: 'Text Container - Tight Spacing'
			}
		},
		{
			name: 'loose',
			label: 'Text Container - Loose Spacing',
			context: {
				modifierClass: 'text-container--spacing-loose',
				headingText: 'Text Container - Loose Spacing'
			}
		},
		{
			name: 'centered',
			label: 'Text Container - Centered',
			context: {
				modifierClass: 'text-container--centered',
				headingText: 'Text Container'
			}
		}
	]
}
