module.exports = {
	title: 'Split Button',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${item.handle} -->\n`
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
