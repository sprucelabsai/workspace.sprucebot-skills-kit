module.exports = {
	title: 'Split Button',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<span class="pl-tight py-tight u-display-ib">${markup}</span>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		defaultAction: 'Check guest in',
		btnClass: 'btn-primary'
	},
	variants: [
		{
			name: 'secondary',
			context: {
				btnClass: 'btn-secondary'
			}
		},
		{
			name: 'primary small',
			context: {
				btnClass: 'btn-primary btn-small'
			}
		},
		{
			name: 'secondary small',
			context: {
				btnClass: 'btn-secondary btn-small'
			}
		}
	]
}
