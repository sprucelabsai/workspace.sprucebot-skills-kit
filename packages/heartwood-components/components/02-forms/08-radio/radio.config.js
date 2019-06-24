module.exports = {
	title: 'Radio',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		id: 'timing',
		name: 'timing',
		label: 'After 5 minutes',
		radioYes:
			'<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>',
		radioNo:
			'<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>'
	},
	variants: [
		{
			name: 'radio 2',
			context: {
				id: 'timing2',
				name: 'timing',
				label: 'After 20 minutes'
			}
		},
		{
			name: 'radio 3',
			context: {
				id: 'timing 3',
				name: 'timing',
				label: 'Never Lock',
				postText: 'The screen will never go into lock mode.'
			}
		}
	]
}
