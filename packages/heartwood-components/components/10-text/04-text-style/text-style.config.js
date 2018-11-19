const Classes = require('../../classes')

module.exports = {
	title: 'Text Style',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<p style="margin: 3rem 0 0.5rem;">${
			item.label
		}</p><p class="text__body">${markup}</p>\n<!-- End: @${item.handle} -->\n`
	},
	preview: '@main-preview',
	variants: [
		{
			name: 'default',
			label: 'Strong Text',
			context: {
				element: 'strong',
				className: 'text__style--strong',
				text: 'This text is some important text. 12345678910'
			}
		},
		{
			name: 'emphasized',
			label: 'Emphasized Text',
			context: {
				element: 'em',
				className: 'text__style--emphasis',
				text: 'This text is emphasized. 12345678910'
			}
		}
	]
}
