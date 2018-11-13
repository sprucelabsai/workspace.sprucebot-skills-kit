module.exports = {
	title: 'Heading',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<p style="margin: 3rem 0 0;">${
			item.label
		}</p>${markup}\n<!-- End: @${item.handle} -->\n`
	},
	preview: '@main-preview',
	context: {
		element: 'h2',
		text: 'Welcome Back!'
	},
	variants: [
		{
			name: 'subheading',
			label: 'Heading as H3',
			context: {
				element: 'h3',
				text: "You're Still Here?"
			}
		}
	]
}
