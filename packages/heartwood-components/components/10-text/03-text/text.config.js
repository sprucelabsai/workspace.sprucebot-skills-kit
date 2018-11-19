const Classes = require('../../classes')

module.exports = {
	title: 'Text',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<p style="margin: 3rem 0 0;">${
			item.label
		}</p>${markup}\n<!-- End: @${item.handle} -->\n`
	},
	preview: '@main-preview',
	context: {
		text:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	}
}
