module.exports = {
	title: 'Primary Button',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<span style="display: inline-block; margin: 0 1rem 1rem 0;">${markup}</span>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		text: 'Sign Up',
		className: 'btn-primary',
		type: 'button'
	},
	variants: [
		{
			name: 'disabled',
			context: {
				disabled: true
			}
		},
		{
			name: 'loading',
			context: {
				className: 'btn-primary btn--loading',
				disabled: true,
				loading: true
			}
		},
		{
			name: 'icon',
			context: {
				text: 'Add a Location',
				icon:
					'<path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>'
			}
		},
		{
			name: 'icon only',
			context: {
				text: null,
				width: '20',
				height: '20',
				icon:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8333 5.83203H9.16666V9.16536H5.83333V10.832H9.16666V14.1654H10.8333V10.832H14.1667V9.16536H10.8333V5.83203V5.83203ZM10 1.66602C5.4 1.66602 1.66666 5.39935 1.66666 9.99935C1.66666 14.5993 5.4 18.3327 10 18.3327C14.6 18.3327 18.3333 14.5993 18.3333 9.99935C18.3333 5.39935 14.6 1.66602 10 1.66602V1.66602ZM9.99999 16.6654C6.32499 16.6654 3.33333 13.6737 3.33333 9.9987C3.33333 6.3237 6.32499 3.33203 9.99999 3.33203C13.675 3.33203 16.6667 6.3237 16.6667 9.9987C16.6667 13.6737 13.675 16.6654 9.99999 16.6654V16.6654Z"/>'
			}
		}
	]
}
