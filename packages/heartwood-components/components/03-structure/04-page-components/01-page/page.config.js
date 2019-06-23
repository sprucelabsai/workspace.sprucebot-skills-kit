module.exports = {
	context: {
		content: 'Page Content',
		hasHeader: true
	},
	variants: [
		{
			name: 'no-header',
			label: 'No Header',
			context: {
				title: 'No Header',
				hasHeader: false
			}
		}
	]
}
