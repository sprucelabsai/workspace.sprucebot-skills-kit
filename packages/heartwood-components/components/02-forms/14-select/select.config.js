module.exports = {
	title: 'Select',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		id: 'country',
		name: 'country',
		label: 'Country',
		icon: '<path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/>',
		options: ['United States', 'Canada', 'New Jersey']
	},
	variants: [
		{
			name: 'small',
			context: {
				class: 'select-small'
			}
		},
		{
			name: 'simple',
			context: {
				label: null,
				class: 'select-simple',
				isSimple: true
			}
		}
	]
}
