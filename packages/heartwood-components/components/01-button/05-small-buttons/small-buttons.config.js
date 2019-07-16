module.exports = {
	title: 'Small Buttons',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<span class="u-wrapper__tight u-display-ib">${markup}</span>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		text: 'Small Buttons',
		className: 'btn-primary btn-small',
		type: 'button'
	},
	variants: [
		{
			name: 'secondary',
			context: {
				className: 'btn-secondary btn-small'
			}
		}
	]
}
