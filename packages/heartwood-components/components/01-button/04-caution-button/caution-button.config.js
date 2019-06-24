module.exports = {
	title: 'Caution Button',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		text: 'Delete Team',
		className: 'btn-caution',
		type: 'button'
	},
	variants: [
		{
			name: 'disabled',
			context: {
				disabled: true
			}
		},
		{
			name: 'loading',
			context: {
				className: 'btn-caution btn--loading',
				disabled: true,
				loading: true
			}
		},
		{
			name: 'icon',
			context: {
				text: 'Remove Location',
				icon:
					'<path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>'
			}
		},
		{
			name: 'icon only',
			context: {
				text: null,
				icon:
					'<path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>'
			}
		}
	]
}
