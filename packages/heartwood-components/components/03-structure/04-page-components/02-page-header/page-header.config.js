const Classes = require('../../../classes')

module.exports = {
	context: {
		Classes: Classes,
		title: 'Page Title'
	},
	variants: [
		{
			name: 'back',
			label: 'With Back Link',
			context: {
				Classes: Classes,
				title: 'Page Title',
				backLink: {
					href: '#',
					title: 'Previous Page'
				}
			}
		}
	]
}
