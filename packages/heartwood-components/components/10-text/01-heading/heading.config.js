module.exports = {
	title: 'Heading',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${
			item.title
		}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	preview: '@main-preview',
	context: {
		element: 'h1',
		text: 'Welcome to your Spruce Dashboard'
	},
	variants: [
		{
			name: 'Heading H2',
			context: {
				element: 'h2',
				text: 'Welcome to your Spruce Dashboard'
			}
		}
	]
}
