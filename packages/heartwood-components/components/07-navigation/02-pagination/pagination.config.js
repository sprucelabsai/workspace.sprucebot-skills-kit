module.exports = {
	title: 'Pagination',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {},
	variants: [
		{
			name: 'No Back',
			context: {
				disableBack: true
			}
		},
		{
			name: 'Pages',
			context: {
				pages: [
					{
						text: '1',
						isCurrent: true
					},
					{
						text: '2'
					},
					{
						text: '3'
					},
					{
						text: null
					},
					{
						text: '22'
					},
					{
						text: '23'
					},
					{
						text: '24'
					}
				]
			}
		},
		{
			name: 'Pages 02',
			context: {
				pages: [
					{
						text: '1'
					},
					{
						text: null
					},
					{
						text: '24'
					},
					{
						text: '25',
						isCurrent: true
					},
					{
						text: '26'
					},
					{
						text: null
					},
					{
						text: '68'
					}
				]
			}
		},
		{
			name: 'Pages 03',
			context: {
				pages: [
					{
						text: '1'
					},
					{
						text: '2'
					},
					{
						text: '3',
						isCurrent: true
					},
					{
						text: '4'
					},
					{
						text: '5'
					}
				]
			}
		},
		{
			name: 'Jump',
			context: {
				showJump: true,
				pages: [
					{
						text: '1'
					},
					{
						text: null
					},
					{
						text: '24'
					},
					{
						text: '25',
						isCurrent: true
					},
					{
						text: '26'
					},
					{
						text: null
					},
					{
						text: '68'
					}
				]
			}
		}
	]
}

// TODO: Add the Jump functionality
