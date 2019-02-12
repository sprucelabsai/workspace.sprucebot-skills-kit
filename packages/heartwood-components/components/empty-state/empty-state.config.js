module.exports = {
	title: 'Empty State',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n${markup}\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		headline: 'Headline',
		subheadline: 'Subheadline',
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M6 7C7.51878 7 8.75 5.76878 8.75 4.25C8.75 2.73122 7.51878 1.5 6 1.5C4.48122 1.5 3.25 2.73122 3.25 4.25C3.25 5.76878 4.48122 7 6 7Z" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M1.5 12.5001C1.50011 10.7267 2.54175 9.11875 4.16015 8.39369C5.77855 7.66863 7.67188 7.96169 8.99533 9.14212" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M8.5 14.5L10.5 16.5L12.5 14.5" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M10.5 16.5V10.5" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.5 12.5L14.5 10.5L16.5 12.5" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M14.5 10.5V16.5" stroke="#0099FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		action: {
			className: 'btn-simple',
			text: 'Go back',
			icon:
				'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6663 9.16665H6.52467L11.183 4.50831L9.99967 3.33331L3.33301 9.99998L9.99967 16.6666L11.1747 15.4916L6.52467 10.8333H16.6663V9.16665V9.16665Z"/>'
		}
	},
	variants: [
		{
			name: 'Without subheadline',
			context: {
				subheadline: null,
				action: {
					className: 'btn-primary',
					text: 'Go back'
				}
			}
		},
		{
			name: 'Without icon',
			context: {
				icon: null
			}
		},
		{
			name: 'Without actions',
			context: {
				actions: null
			}
		},
		{
			name: 'Without subheadline, icon',
			context: {
				subheadline: null,
				icon: null
			}
		},
		{
			name: 'Without subheadline, actions',
			context: {
				subheadline: null,
				action: null
			}
		},
		{
			name: 'Without actions, icon',
			context: {
				icon: null,
				action: null
			}
		},
		{
			name: 'Without subheadline, icon, actions',
			context: {
				subheadline: null,
				icon: null,
				action: null
			}
		}
	]
}
