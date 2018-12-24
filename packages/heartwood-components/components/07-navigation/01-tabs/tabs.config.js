module.exports = {
	title: 'Tabs',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div margin: 0 1rem 1rem 0;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		isPadded: true,
		tabs: [
			{
				text: 'Little Black Book <span class="tab__emoji">📓</span>',
				href: '#'
			},
			{
				text: 'Guests',
				isCurrent: true,
				href: '#'
			},
			{
				text: 'Everyone',
				href: '#'
			}
		]
	},
	variants: [
		{
			name: 'large group',
			context: {
				overflow: true,
				tabs: [
					{
						text: 'Active',
						isCurrent: true
					},
					{
						text: 'Current'
					},
					{
						text: 'Previous'
					},
					{
						text: 'Cancelled'
					}
				]
			}
		}
	]
}
