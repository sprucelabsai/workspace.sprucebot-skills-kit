module.exports = {
	title: 'Subheading',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<p style="margin: 3rem 0 0;">${
			item.label
		}</p>${markup}\n<!-- End: @${item.handle} -->\n`
	},
	preview: '@main-preview',
	context: {
		element: 'h3',
		text: "Here's a section worth looking at"
	},
	variants: [
		{
			name: 'subheading-h4',
			label: 'Subheading as H4',
			context: {
				element: 'h3',
				text: 'Do you fancy this section instead?'
			}
		}
	]
}
