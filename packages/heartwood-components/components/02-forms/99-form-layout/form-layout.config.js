module.exports = {
	title: 'Form Layout',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${
			item.title
		}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		formLayoutItems: [
			{
				textInput: {
					label: 'Input Label'
				}
			},
			{
				textInput: {
					label: 'Input Label'
				}
			}
		]
	},
	variants: [
		{
			name: 'Field Group',
			context: {
				formLayoutItems: [],
				formLayoutGroups: [
					{
						condensed: false,
						formLayoutItems: [
							{
								textInput: {
									label: 'Input Label'
								}
							},
							{
								textInput: {
									label: 'Input Label'
								}
							}
						]
					}
				]
			}
		},
		{
			name: 'Field Group Condensed',
			context: {
				formLayoutItems: [],
				formLayoutGroups: [
					{
						condensed: true,
						formLayoutItems: [
							{
								textInput: {
									label: 'Input Label'
								}
							},
							{
								textInput: {
									label: 'Input Label'
								}
							},
							{
								textInput: {
									label: 'Input Label'
								}
							},
							{
								textInput: {
									label: 'Input Label'
								}
							}
						]
					}
				]
			}
		}
	]
}
