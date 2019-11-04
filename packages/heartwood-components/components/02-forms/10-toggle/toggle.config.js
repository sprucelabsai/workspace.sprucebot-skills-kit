module.exports = {
	title: 'Toggle',
	status: 'wip',
	collated: true,
	collator(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		on: true,
		id: 'toggle'
	},
	variants: [
		{
			name: 'off',
			context: {
				id: 'toggle 2',
				on: false
			}
		},
		{
			name: 'with text',
			context: {
				id: 'toggle 3',
				postText: 'Night Mode'
			}
		}
	]
}
