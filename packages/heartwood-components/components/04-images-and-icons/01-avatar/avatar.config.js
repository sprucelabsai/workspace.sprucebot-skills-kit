const image =
	'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=192&h=192&q=80'

module.exports = {
	title: 'Avatar',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${
			item.handle
		} -->\n<div style="margin-bottom: 2rem;">${markup}</div>\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		image
	},
	variants: [
		{
			name: 'Has Image',
			context: {
				image
			}
		},
		{
			name: 'Has Name',
			context: {
				image,
				name: 'Madaline Gibson'
			}
		},
		{
			name: 'Has Name + Text',
			context: {
				image,
				name: 'Vicenta Maggio',
				text: 'Services: Beard Tinting, Head Shave'
			}
		},
		{
			name: 'Has Image',
			context: {
				image,
				showIndicator: true,
				isOnline: true
			}
		},
		{
			name: 'Has Name',
			context: {
				image,
				name: 'Madaline Gibson',
				showIndicator: true,
				isOnline: true
			}
		},
		{
			name: 'Has Name + Text',
			context: {
				image,
				name: 'Vicenta Maggio',
				text: 'Services: Beard Tinting, Head Shave',
				showIndicator: true,
				isOnline: true
			}
		},
		{
			name: 'Has Image',
			context: {
				image,
				showIndicator: true
			}
		},
		{
			name: 'Has Name',
			context: {
				image,
				name: 'Madaline Gibson',
				showIndicator: true
			}
		},
		{
			name: 'Has Name + Text',
			context: {
				image,
				name: 'Vicenta Maggio',
				text: 'Services: Beard Tinting, Head Shave',
				showIndicator: true
			}
		},
		{
			name: 'Has Name, Vert',
			context: {
				image,
				name: 'Madaline Gibson',
				showIndicator: true,
				isVertical: true
			}
		},
		{
			name: 'Has Name + Text, Vert',
			context: {
				image,
				name: 'Vicenta Maggio',
				text: 'Services: Beard Tinting, Head Shave',
				showIndicator: true,
				isVertical: true
			}
		},
		{
			name: 'Large',
			context: {
				image,
				showIndicator: true,
				isLarge: true
			}
		},
		{
			name: 'Large, Name',
			context: {
				image,
				name: 'Vicenta Maggio',
				showIndicator: true,
				isVertical: true,
				isLarge: true
			}
		},
		{
			name: 'Large, Name + Text',
			context: {
				image,
				name: 'Vicenta Maggio',
				text: 'Services: Beard Tinting, Head Shave',
				showIndicator: true,
				isVertical: true,
				isLarge: true
			}
		}
	]
}
