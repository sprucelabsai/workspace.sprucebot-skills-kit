module.exports = {
	title: 'Button Variations',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
        return `<!-- Start: @${item.handle} -->\n<div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		text: 'Full Width Buttons',
		className: 'btn-primary btn-full-width',
		type: 'button'
	},
	variants: [
		{
			name: 'primary small',
			context: {
				className: 'btn-primary btn-small btn-full-width',
			}
		},
		{
			name: 'secondary',
			context: {
				className: 'btn-secondary btn-full-width',
			}
		},
		{
			name: 'secondary small',
			context: {
				className: 'btn-secondary btn-small btn-full-width',
			}
		}
	]
  }