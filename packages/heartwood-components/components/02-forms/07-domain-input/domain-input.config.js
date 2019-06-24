module.exports = {
	title: 'Domain Input',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<div style="margin-top: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		label: 'Shopify Url',
		placeholder: 'my-shopify-shop',
		name: 'shopify-url',
		id: 'shopifyUrl',
		appendix: '.myshopify.com'
	},
	variants: [
		{
			name: 'small',
			context: {
				class: 'text-input-small'
			}
		}
	]
}
