module.exports = {
	title: "Toast",
	collated: true,
	collator: function(markup, item) {
        return `<!-- Start: @${item.handle} -->\n<div style="margin-bottom: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		headline: 'Hooray!',
		body: 'Something great just happened. Congratulations!',
		isPositive: true,
		removeIcon: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>'
	},
	variants: [
		{
			name: 'Negative',
			context: {
				headline: 'Oh No!',
				body: 'Something terrible just happened. Good luck…',
				isPositive: false,
				isNegative: true
			}
		},
		{
			name: 'Neutral',
			context: {
				headline: 'Neat',
				body: 'Something just happened. It was neither here nor there.',
				isPositive: false
			}
		},
		{
			name: 'Negative with Footer Action',
			context: {
				headline: 'Team Deleted',
				body: 'You just deleted your entire team.',
				isPositive: false,
				isNegative: true,
				footerAction: true
			}
		}
	]
}