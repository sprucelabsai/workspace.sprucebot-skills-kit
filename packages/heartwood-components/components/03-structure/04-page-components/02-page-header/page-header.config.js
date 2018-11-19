const Classes = require('../../../classes')

module.exports = {
	context: {
		title: 'Page Title'
	},
	variants: [
		{
			name: 'back',
			label: 'With Back Link',
			context: {
				title: 'Page Title',
				backLink: {
					href: '#',
					title: 'Previous Page'
				}
			}
		}
	]
}
