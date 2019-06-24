module.exports = {
	title: 'Search',
	collated: true,
	status: 'wip',
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		placeholder: 'Search teammates…',
		iconBefore:
			'<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/>',
		search: true
	},
	variants: [
		{
			name: 'small',
			context: {
				class: 'text-input-small'
			}
		},
		{
			name: 'with value',
			context: {
				value: 'barber services',
				iconAfter:
					'<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/>'
			}
		},
		{
			name: 'readonly',
			context: {
				value: 'barber services',
				readonly: true
			}
		}
	]
}
