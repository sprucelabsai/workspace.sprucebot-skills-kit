module.exports = {
	title: 'Small Buttons',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
        return `<!-- Start: @${item.handle} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${item.handle} -->\n`
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
				className: 'btn-secondary btn-small',
			}
		}
	]
  }