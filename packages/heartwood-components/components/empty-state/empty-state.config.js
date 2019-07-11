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
		icon: {
			src:
				'<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.70996C16.1421 1.70996 19.5 5.06783 19.5 9.20996C19.5 12.757 14 21.591 12.421 24.06C12.3291 24.2034 12.1704 24.2902 12 24.2902C11.8296 24.2902 11.6709 24.2034 11.579 24.06C10 21.592 4.5 12.757 4.5 9.20996C4.5 5.06783 7.85786 1.70996 12 1.70996Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 12.21C13.6569 12.21 15 10.8668 15 9.20996C15 7.55311 13.6569 6.20996 12 6.20996C10.3431 6.20996 9 7.55311 9 9.20996C9 10.8668 10.3431 12.21 12 12.21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
		},
		action: {
			className: 'btn-simple',
			text: 'Go back',
			icon: {
				src:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6663 9.16665H6.52467L11.183 4.50831L9.99967 3.33331L3.33301 9.99998L9.99967 16.6666L11.1747 15.4916L6.52467 10.8333H16.6663V9.16665V9.16665Z"/>'
			}
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
