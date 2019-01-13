const eventCard = {
	header: {
		title: 'I am an event card',
		contextMenu: {
			actions: [
				{
					className: '',
					kind: 'primary',
					isSmall: false,
					isFullWidth: false,
					isLoading: false,
					isIconOnly: false,
					text: 'See the Event',
					key: 'see',
					href: 'https://sprucebot.com',
					icon: {
						icon: 'foo',
						isLineIcon: false,
						className: ''
					},
					type: 'button',
					// onClick: 'function',
					payload: {}
				},
				{
					className: '',
					kind: 'primary',
					isSmall: false,
					isFullWidth: false,
					isLoading: false,
					isIconOnly: false,
					text: 'Cancel the Event',
					key: 'go',
					href: 'https://sprucebot.com',
					icon: {
						icon: 'foo',
						isLineIcon: false,
						className: ''
					},
					type: 'button',
					// onClick: 'function',
					payload: {}
				}
			]
		}
	},
	headerImage: {
		src: 'https://picsum.photos/720/360/?image=838',
		width: 720,
		height: 360
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					key: 'text',
					text:
						"Learn about how your whole family can enjoy our new hair care products. 2 Day's only"
				}
			},
			{
				type: 'list',
				props: {
					key: 'a-list',
					header: {
						title: 'A fantastic list!',
						subtitle: 'A great subtitle!'
					},
					items: [
						{
							title: 'Fri, Feb 10th 2018',
							subtitle: '7am-2pm',
							icon: { name: 'calendar', isLineIcon: true },
							key: 'first',
							actions: [
								{
									text: 'Sign Up',
									key: 'sign-up',
									// event: 'example:test-event',
									// payload: { some: 'payload' }
									// destination: {
									// slug: 'location_dashboard',
									// query: '',
									url: 'https://www.eventbrite.com/',
									target: '_blank'
								}
							]
						},
						{
							title: 'Fri, Feb 17th 2018',
							subtitle: '7am-2pm',
							key: 'second',
							avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
							actions: [
								{
									text: 'Sign Up',
									key: 'sign-up',
									// event: 'example:test-event',
									// payload: { some: 'payload' }
									// destination: {
									// slug: 'location_dashboard',
									// query: '',
									url: 'https://www.eventbrite.com/',
									target: '_blank'
								}
							]
						}
					]
				}
			}
		]
	}
}

const celebrateCard = {
	headerImage: {
		src: 'https://picsum.photos/720/360/?image=828',
		width: 720,
		height: 360
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					key: 'first',
					children: 'Congrats you have made 100 appointments this week!'
				}
			}
		]
	}
}

const bookAppointmentCard = {
	header: {
		title: "Looks like it's time for your next appointment!"
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					key: 'second',
					children:
						"We haven't seen you in 5 week! Book an appointment today with Ken Goldfarb."
				}
			}
		]
	},
	footer: {
		actions: [
			{
				className: '',
				kind: 'secondary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			},
			{
				className: '',
				kind: 'secondary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			}
		]
	}
}

const upcomingAppointmentCard = {
	header: {
		actions: [
			{
				className: '',
				kind: 'primary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			},
			{
				className: '',
				kind: 'primary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			}
		]
	},
	body: {
		children: [
			{
				type: 'list',
				props: {
					header: {
						title: 'Looks like you have an upcoming appointment.',
						subtitle: 'Friday, Feb 12th, 2018 @ 3:00pm with Ken Goldfarb.'
					},
					items: [
						{
							title: 'Hair Color',
							subtitle: '10:30am-12pm',
							icon: 'calendar',
							avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
						},
						{
							title: 'Haircut',
							subtitle: '12pm-2pm',
							icon: 'calendar'
						}
					]
				}
			}
		]
	},
	footer: {
		primary: {
			text: 'Goto Appointment',
			event: null,
			payload: null,
			destination: {
				slug: 'guest_appointments',
				query: '#booking'
			}
		}
	}
}

const basicCard = {
	header: {
		title: 'The is an example of a basic card.'
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					children:
						'Just a little bit of info for you just in case you needed it.'
				}
			}
		]
	},
	footer: {
		actions: [
			{
				className: '',
				kind: 'primary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			}
		]
	}
}

const criticalCard = {
	header: {
		title: 'Please update your calendar.',
		icon: 'critical',
		iconText: 'Billing Failure'
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					children:
						'Just a little bit of info for you just in case you needed it.'
				}
			}
		]
	},
	footer: {
		actions: [
			{
				className: '',
				kind: 'primary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			}
		]
	}
}

const scoreCard = {
	header: {
		title: 'Value of future appointments'
	},
	body: {
		children: [
			{
				type: 'text',
				props: {
					children:
						'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'
				}
			},
			{
				type: 'scores',
				props: {
					scores: [
						{
							label: 'Today',
							value: '$1,800'
						},
						{
							label: 'This week',
							value: '$3,500'
						},
						{
							label: 'Last Week',
							value: '$3,900'
						}
					]
				}
			}
		]
	},
	footer: {
		actions: [
			{
				className: '',
				kind: 'primary',
				isSmall: false,
				isFullWidth: false,
				isLoading: false,
				isIconOnly: false,
				text: 'See the Event',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'foo',
					isLineIcon: false,
					className: ''
				},
				type: 'button',
				// onClick: 'function',
				payload: {}
			}
		]
	}
}

const cardResponses = [
	{
		title: 'Hair care product event',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is a test comment for a developer',
		id: '1',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: 'All new product hair care event from Ulta Beauty.',
		isTemporary: false,
		canDismiss: true,
		isCentered: false,
		cardBuilder: eventCard
	},
	{
		title: 'Very simple card with image in header only and no header title',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is a test comment for a developer',
		id: '2',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: 'Check it out!',
		isTemporary: false,
		canDismiss: true,
		isCentered: true,
		cardBuilder: celebrateCard
	},
	{
		title: 'Book an appointment today!',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is a simple appointment card.',
		id: '3',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: 'We hope to see you back at Ulta soon!',
		isTemporary: false,
		canDismiss: true,
		cardBuilder: bookAppointmentCard
	},
	{
		title: "You're upcoming appointment!",
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is an upcoming appointment card.',
		id: '3',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: 'Looks like you have an upcming appointment!',
		isTemporary: false,
		canDismiss: false,
		cardBuilder: upcomingAppointmentCard
	},
	{
		title: 'This is a basic card layout!',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is an basic card.',
		id: '4',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: "Looks like this card does't have much to say!",
		isTemporary: false,
		canDismiss: false,
		cardBuilder: basicCard
	},
	{
		title: 'This is a basic card layout!',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is an basic card.',
		id: '5',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: "Looks like this card does't have much to say!",
		isTemporary: false,
		canDismiss: false,
		cardBuilder: criticalCard
	},
	{
		title: 'This is a score card layout!',
		page: 'user_dashboard',
		skillSlug: process.env.SLUG,
		comment: 'This is an score card.',
		id: '6',
		roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
		description: 'Here are all the score to share!',
		isTemporary: false,
		canDismiss: false,
		cardBuilder: scoreCard
	}
]

module.exports = cardResponses
