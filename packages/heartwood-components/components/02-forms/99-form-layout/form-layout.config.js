module.exports = {
	title: 'Form Layout',
	status: 'wip',
	collated: true,
	collator(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${item.label}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
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
			name: 'Tight Vertical Spacing',
			context: {
				modifierClass: 'form-layout--spacing-tight',
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
		},
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
