module.exports = {
	context: {
		title: 'Page Title'
	},
	variants: [
		{
			name: 'breadcrumb',
			label: 'With Breadcrumb',
			context: {
				title: 'Page Title',
				breadcrumb: {
					href: '#',
					title: 'Previous Page'
				}
			}
		}
	]
}
