const Classes = require('../../classes')

module.exports = {
	title: 'Form Layout',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${
			item.label
		}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		Classes: Classes,
		formLayoutItems: [
			{
				Classes: Classes,
				textInput: {
					Classes: Classes,
					label: 'Input Label'
				}
			},
			{
				Classes: Classes,
				textInput: {
					Classes: Classes,
					label: 'Input Label'
				}
			}
		]
	},
	variants: [
		{
			name: 'Field Group',
			context: {
				Classes: Classes,
				formLayoutItems: [],
				formLayoutGroups: [
					{
						Classes: Classes,
						condensed: false,
						formLayoutItems: [
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
									label: 'Input Label'
								}
							},
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
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
				Classes: Classes,
				formLayoutItems: [],
				formLayoutGroups: [
					{
						Classes: Classes,
						condensed: true,
						formLayoutItems: [
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
									label: 'Input Label'
								}
							},
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
									label: 'Input Label'
								}
							},
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
									label: 'Input Label'
								}
							},
							{
								Classes: Classes,
								textInput: {
									Classes: Classes,
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
