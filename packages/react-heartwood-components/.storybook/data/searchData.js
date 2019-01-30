import user01image from '../../static/assets/users/user-01--96w.png'
import user02image from '../../static/assets/users/user-02--96w.png'
import user03image from '../../static/assets/users/user-03--96w.png'
import user04image from '../../static/assets/users/user-04--96w.png'
import user05image from '../../static/assets/users/user-05--96w.png'
import user06image from '../../static/assets/users/user-06--96w.png'
import user07image from '../../static/assets/users/user-07--96w.png'
import user08image from '../../static/assets/users/user-08--96w.png'
import user09image from '../../static/assets/users/user-09--96w.png'

export const recentSearchResults = [
	{
		header: {
			title: 'Recent Searches'
		},
		items: [
			{
				avatar: user01image,
				title: 'Lacey Morissette',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user02image,
				title: 'Jade Mohr',
				subtitle: 'Stylist',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user03image,
				title: 'Gianni Block',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	}
]

export const suggestedSearchResults = [
	{
		header: {
			title: 'Guests/Teammates'
		},
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Manager',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	},
	{
		header: {
			title: 'Shopify Customers'
		},
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Manager',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	}
]

export const searchResults = [
	{
		text: 'Guests',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Guest',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	},
	{
		text: 'Teammates',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Stylist',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Manager',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Teammate',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	},
	{
		text: 'Shopify Customers',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Customer since 03/18',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Customer since 07/14',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Customer since 01/19',
				primaryAction: {
					onClick: () => console.log('clicked!')
				}
			}
		]
	}
]
