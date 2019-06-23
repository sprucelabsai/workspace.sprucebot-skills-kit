const image =
	'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=192&h=192&q=80'

module.exports = {
	title: 'Header Primary',
	context: {
		openIcon:
			'<path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
		closeIcon:
			'<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>'
	},
	variants: [
		{
			name: 'Organization',
			context: {
				organizationImgUrl:
					'https://www.logoground.com/uploads/2018130762018-04-113965123chimera%20logo%20chimera%20logo.jpg',
				organization: 'Chimera Hair Salon'
			}
		},
		{
			name: 'User',
			context: {
				organizationImgUrl:
					'https://www.logoground.com/uploads/2018130762018-04-113965123chimera%20logo%20chimera%20logo.jpg',
				organization: 'Chimera Hair Salon',
				user: {
					name: 'Erica Romaguera',
					phoneNumber: '(605) 230-5253',
					image
				}
			}
		},
		{
			name: 'Location',
			context: {
				organization: 'Chimera Hair Salon',
				address: '7678 N High St, Denver, CO',
				user: {
					name: 'Erica Romaguera',
					phoneNumber: '(605) 230-5253',
					image
				}
			}
		}
	]
}
