module.exports = {
	context: {
		content: '<p>Page Content</p>'
	},
	variants: [
		{
			name: 'single-column',
			label: 'Single Column',
			context: {
				singleColumn: true
			}
		}
	]
}
