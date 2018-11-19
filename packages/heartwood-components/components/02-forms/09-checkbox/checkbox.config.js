const Classes = require('../../classes')

module.exports = {
	title: 'Checkbox',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-bottom: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		id: 'tor-notify',
		name: 'torNotify',
		label: 'Notify me when someone makes a time-off request',
		iconYes:
			'<path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
		iconNo:
			'<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M0 0h24v24H0z" fill="none"/>',
		iconMaybe:
			'<defs><path id="a" d="M0 0h24v24H0z"/></defs><clipPath id="b">use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>'
	},
	variants: [
		{
			name: 'More Text',
			context: {
				id: 'tor-notify2',
				name: 'torNotify2',
				postText: 'This means that people will be getting text messages.'
			}
		},
		{
			name: 'Indeterminate',
			context: {
				id: 'tor-notify3',
				name: 'torNotify3',
				postText: 'This means that people will be getting text messages.',
				maybe: true
			}
		}
	]
}
