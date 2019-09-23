module.exports = {
	title: 'Credit Card Input',
	collated: true,
	collator(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		label: 'Credit Card',
		placeholder: null,
		type: 'text',
		id: 'credit-card',
		name: 'creditCard',
		creditCard: true
	},
	variants: [
		{
			name: 'read only',
			context: {
				readonly: true,
				value: 'XXXX XXXX XXXX 1234'
			}
		}
	]
}
