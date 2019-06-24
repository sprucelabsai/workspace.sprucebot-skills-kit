module.exports = {
	title: 'Action List',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="padding: 2rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		actions: [
			{
				text: 'Confirm Changes',
				className: 'btn-primary'
			},
			{
				text: 'Cancel',
				className: 'btn-secondary'
			}
		]
	},
	variants: [
		{
			name: 'Segmented',
			context: {
				isSegmented: true,
				actions: [
					{
						text: 'Option One',
						className: 'btn-secondary'
					},
					{
						text: 'Option Two',
						className: 'btn-secondary'
					},
					{
						text: 'Option Three',
						className: 'btn-secondary'
					}
				]
			}
		},
		{
			name: 'Floating',
			context: {
				isFloating: true,
				actions: [
					{
						text: 'Edit Service',
						className: 'btn-simple btn-full-width'
					},
					{
						text: 'Hide Service',
						className: 'btn-simple btn-full-width'
					},
					{
						text: 'Move to Category',
						className: 'btn-simple btn-full-width'
					}
				]
			}
		}
	]
}
