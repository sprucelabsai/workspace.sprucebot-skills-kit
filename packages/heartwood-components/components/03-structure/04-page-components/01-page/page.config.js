const Classes = require('../../../classes')

module.exports = {
	context: {
		content: 'Page Content'
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
