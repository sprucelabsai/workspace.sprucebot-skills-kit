// @flow
import type { CardBuilder, CardResponse } from './card-flow-types'

const eventCard: CardBuilder = {
	header: {
		title: 'I am an event card',
		contextMenu: {
			isLeftAligned: false,
			isBottomAligned: false,
			size: 'large',
			text: 'Menu',
			icon: {
				icon: 'caution',
				isLineIcon: true,
				className: 'foo'
			},
			isSimple: true,
			isSmall: true,
			closeOnSelectAction: false,
			isTextOnly: true,
			className: 'event-menu',
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
		isSectioned: true,
		children: [
			{
				type: 'text',
				key: 'learn',
				text:
					"Learn about how your whole family can enjoy our new hair care products. 2 Day's only",
				props: {}
			},
			{
				type: 'list',
				key: 'list',
				heading: {
					key: 'foo',
					title: 'A List of items for testing',
					subtitle: 'I am a subtitle',
					props: {}
				},
				props: {},
				items: [
					{
						key: 'item-1',
						title: 'Fri, Feb 10th 2018',
						subtitle: '7am-2pm',
						image: {
							icon: 'alert',
							props: {}
						},
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
						key: 'item-2',
						title: 'Fri, Feb 17th 2018',
						subtitle: '7am-2pm',
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
		]
	}
}

const celebrateCard: CardBuilder = {
	headerImage: {
		src: 'https://picsum.photos/720/360/?image=828',
		width: 720,
		height: 360
	},
	body: {
		isSectioned: false,
		children: [
			{
				type: 'text',
				key: 'text',
				text: 'Congrats you have made 100 appointments this week!'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
				isFullWidth: true,
				isIconOnly: false,
				text: 'View Reports',
				href: 'https://sprucebot.com',
				icon: {
					icon: 'alert',
					isLineIcon: false
				},
				type: 'button',
				payload: {}
			}
		]
	}
}

const bookAppointmentCard: CardBuilder = {
	header: {
		title: "Looks like it's time for your next appointment!"
	},
	body: {
		isSectioned: true,
		children: [
			{
				key: 'text',
				type: 'text',
				text:
					"We haven't seen you in 5 week! Book an appointment today with Ken Goldfarb."
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
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
				target: '_blank',
				payload: {}
			},
			{
				key: 'key',
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
				payload: {}
			}
		]
	}
}

const upcomingAppointmentCard: CardBuilder = {
	header: {
		actions: [
			{
				key: 'key',
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

				// onClick: 'function',
				payload: {}
			},
			{
				key: 'key',
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
				// onClick: 'function',
				payload: {}
			}
		]
	},
	body: {
		isSectioned: false,
		children: [
			{
				key: 'list',
				type: 'list',
				items: [
					{
						key: '001',
						title: 'Hair Color',
						subtitle: '10:30am-12pm',
						icon: 'calendar',
						avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
					},
					{
						key: '002',
						title: 'Haircut',
						subtitle: '12pm-2pm',
						icon: 'calendar'
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
				text: 'Goto Appointment',
				href: 'https://spruce.ai'
			}
		]
	}
}

const basicCard: CardBuilder = {
	header: {
		title: 'The is an example of a basic card.'
	},
	body: {
		isSectioned: false,
		children: [
			{
				type: 'text',
				key: 'text',
				text: 'Just a little bit of info for you just in case you needed it.'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
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
				payload: {}
			}
		]
	}
}

const criticalCard: CardBuilder = {
	header: {
		title: 'Please update your calendar.',
		icon: 'critical',
		iconText: 'Billing Failure'
	},
	body: {
		isSectioned: false,
		children: [
			{
				key: 'text',
				type: 'text',
				text: 'Just a little bit of info for you just in case you needed it.'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
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
				payload: {}
			}
		]
	}
}

const scoreCard: CardBuilder = {
	header: {
		title: 'Value of future appointments'
	},
	body: {
		isSectioned: true,
		children: [
			{
				type: 'scores',
				key: 'todays-scores',
				scores: [
					{
						key: '1',
						label: 'Today',
						value: '$1,800'
					},
					{
						key: '2',
						label: 'This week',
						value: '$3,500'
					},
					{
						key: '3',
						label: 'Last Week',
						value: '$3,900'
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
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
				payload: {}
			}
		]
	}
}

const textBodyCard: CardBuilder = {
	header: {
		title: 'Get the most out of Spruce'
	},
	body: {
		isSectioned: false,
		children: [
			{
				key: '001',
				type: 'text',
				text:
					'Two roads diverged in a wood, and I took the one less traveled by. And that has made all the difference.'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
				className: '',
				kind: 'secondary',
				text: 'Get some skills',
				href: 'https://sprucebot.com',
				payload: {}
			},
			{
				key: 'key',
				className: '',
				kind: 'secondary',
				text: "Don't get skills",
				href: 'https://sprucebot.com',
				payload: {}
			}
		]
	}
}

const headerActionCard: CardBuilder = {
	header: {
		title: 'Add your teammates',
		actions: [
			{
				key: 'key',
				className: '',
				kind: 'secondary',
				text: 'Go to team',
				href: 'https://sprucebot.com',
				payload: {}
			}
		]
	},
	body: {
		isSectioned: false,
		children: [
			{
				key: '001',
				type: 'text',
				text:
					'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
				className: '',
				kind: 'secondary',
				text: 'Leave team',
				href: 'https://sprucebot.com',
				payload: {}
			}
		]
	}
}

// const congratsCard: CardBuilder = {
// 	header: {
// 		title: 'Congrats on 5 guests!'
// 	},
// 	body: {
// 		isSectioned: false,
// 		children: [
// 			{
// 				key: '001',
// 				type: 'image',
// 				style: 'hero',
// 				src:
// 					'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b2b3eeca79a80926667ec71b01eac12&auto=format&fit=crop&w=1000&q=80'
// 			},
// 			{
// 				key: '002',
// 				text:
// 					"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."
// 			}
// 		]
// 	}
// }

const happyBirthdayCard: CardBuilder = {
	header: {
		title: 'Happy birthday!'
	},
	body: {
		children: [
			{
				key: '001',
				type: 'image',
				style: 'hero',
				src:
					'https://images.unsplash.com/photo-1486116736668-6384736c9330?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bfef516f4e9f18402615fd3699ca7fa2&auto=format&fit=crop&w=1000&q=80'
			}
		]
	},
	footer: {
		actions: [
			{
				key: 'key',
				className: '',
				kind: 'secondary',
				text: 'Send a birthday message',
				href: 'https://sprucebot.com',
				payload: {}
			}
		]
	}
}

const appointmentCard: CardBuilder = {
	header: {
		title: 'In store now',
		contextMenu: {
			isLeftAligned: true,
			isBottomAligned: false,
			size: 'medium',
			text: 'Manage Appointment',
			icon: {
				icon: 'caution',
				isLineIcon: true,
				className: 'foo'
			},
			isSimple: false,
			isSmall: true,
			closeOnSelectAction: false,
			isTextOnly: true,
			className: 'appointment-menu',
			actions: [
				{
					key: 'key',
					text: 'Add a guest',
					href: 'https://sprucebot.com',
					icon: {
						icon: 'add',
						isLineIcon: false,
						className: ''
					}
				},
				{
					key: 'key',
					text: 'Phone a friend',
					href: 'https://sprucebot.com',
					icon: {
						icon: 'phone',
						isLineIcon: false,
						className: ''
					}
				}
			]
		}
	},
	body: {
		children: [
			{
				key: '001',
				type: 'list',
				items: [
					{
						key: 'key',
						title: 'Vicenta Maggio',
						subtitle: 'Guest',
						image: {
							src:
								'https://images.pexels.com/photos/1542103/pexels-photo-1542103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200',
							name: 'Corban',
							width: 200,
							height: 200
						},
						actions: [
							{
								key: 'key',
								text: 'Phone a friend',
								href: 'https://sprucebot.com',
								icon: {
									icon: 'phone',
									isLineIcon: false,
									className: ''
								}
							}
						]
					},
					{
						key: 'key',
						title: 'Madaline Gibson',
						subtitle: 'Teammate',
						image: {
							src:
								'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200',
							width: 200,
							height: 200
						}
					},
					{
						key: 'key',
						title: 'Katlynn Pouros',
						subtitle: 'Guest',
						image: {
							src:
								'https://images.pexels.com/photos/789812/pexels-photo-789812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
							width: 200,
							height: 200
						},
						actions: [
							{
								key: 'key',
								text: 'Phone a friend',
								href: 'https://sprucebot.com',
								icon: {
									icon: 'phone',
									isLineIcon: false,
									className: ''
								}
							}
						]
					}
				]
			}
		]
	}
}

const vfaCard: CardBuilder = {
	header: {
		title: 'Value of future appointments',
		actions: [
			{
				key: 'key',
				text: 'Go to reports',
				href: 'https://sprucebot.com'
			}
		]
	},
	body: {
		isSectioned: false,
		children: [
			{
				type: 'scores',
				key: 'scores-list',
				scores: [
					{
						key: '001',
						label: 'Today',
						value: '$1,848'
					},
					{
						key: '002',
						label: 'This Week',
						value: '$5,778'
					},
					{
						key: '003',
						label: 'This Month',
						value: '$25,068'
					}
				]
			}
		]
	}
}

const onboardingCard: CardBuilder = {
	onboarding: {
		title: 'Keep the ball rolling!',
		steps: [
			{
				id: '01',
				tabTitle: 'Add your first location',
				panelTitle: 'Add your first location',
				panelCopy:
					'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe, Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
				panelCTA: {
					text: 'Add your location',
					kind: 'primary'
				},
				panelIcon: {
					icon: 'check_circle'
				}
			},
			{
				id: '02',
				tabTitle: 'Set up your team',
				panelTitle: 'Add your teammates and their info',
				panelCopy:
					'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe, Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
				panelCTA: {
					text: 'Add teammates',
					kind: 'secondary'
				},
				panelIcon: {
					icon: 'check_circle'
				}
			},
			{
				id: '03',
				tabTitle: 'Go live',
				panelTitle: 'Go live and start welcoming guests',
				panelCopy:
					'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe, Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
				panelCTA: {
					text: 'Go live',
					kind: 'primary'
				},
				panelIcon: {
					icon: 'check_circle'
				}
			}
		]
	}
}

const eventCardResponse: CardResponse = {
	title: 'Hair care product event',
	comment: 'This is a test comment for a developer',
	id: 'ulta:eventCard001',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'All new product hair care event from Ulta Beauty.',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '1',
	isTemporary: false,
	canDismiss: true,
	isCentered: false,
	cardBuilder: eventCard
}

const celebrateCardResponse: CardResponse = {
	title: 'Very simple card with image in header only and no header title',
	comment: 'This is a test comment for a developer',
	id: 'example:celebrateCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Check it out!',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '2',
	isTemporary: false,
	canDismiss: true,
	isCentered: true,
	cardBuilder: celebrateCard
}

const bookAppointmentCardResponse: CardResponse = {
	title: 'Book an appointment today!',
	comment: 'This is a simple appointment card.',
	id: 'example:bookAppointmentCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'We hope to see you back at Ulta soon!',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '3',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: bookAppointmentCard
}

const appointmentCardResponse: CardResponse = {
	title: "You're upcoming appointment!",
	comment: 'This is an upcoming appointment card.',
	id: 'example:appointmentCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Looks like you have an upcoming appointment!',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '4',
	isTemporary: false,
	canDismiss: false,
	cardBuilder: appointmentCard
}

const basicCardResponse: CardResponse = {
	title: 'This is a basic card layout!',
	comment: 'This is an basic card.',
	id: 'example:basicCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: "Looks like this card doesn't have much to say!",
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '5',
	isTemporary: false,
	canDismiss: false,
	cardBuilder: basicCard
}

const criticalCardResponse: CardResponse = {
	title: 'This is a basic card layout!',
	comment: 'This is an basic card.',
	id: 'example:criticalCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: "Looks like this card doesn't have much to say!",
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '6',
	isTemporary: false,
	canDismiss: false,
	cardBuilder: criticalCard
}

const scoreCardResponse: CardResponse = {
	title: 'This is a score card layout!',
	comment: 'This is an score card.',
	id: 'example:scoreCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Here are all the score to share!',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '7',
	isTemporary: false,
	canDismiss: false,
	cardBuilder: scoreCard
}

const textBodyCardResponse: CardResponse = {
	title: 'textBodyCard',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: textBodyCard
}

const headerActionCardResponse: CardResponse = {
	title: 'headerActionCard',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: headerActionCard
}

const happyBirthdayCardResponse: CardResponse = {
	title: 'happyBirthdayCard',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: happyBirthdayCard
}

const upcomingAppointmentCardResponse: CardResponse = {
	title: 'upcomingAppointmentCard',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: upcomingAppointmentCard
}

const vfaCardResponse: CardResponse = {
	title: 'vfaCard',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: vfaCard
}

const onboardingCardResponse: CardResponse = {
	title: 'Onboarding',
	comment: 'Test Card',
	id: 'example:testCard',
	roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
	description: 'Test Card',
	skillSlug: 'booking',
	page: 'dashboard_location',
	order: '0',
	isTemporary: false,
	canDismiss: true,
	cardBuilder: onboardingCard
}

const cardResponses: Array<CardResponse> = [
	eventCardResponse,
	celebrateCardResponse,
	bookAppointmentCardResponse,
	appointmentCardResponse,
	basicCardResponse,
	criticalCardResponse,
	scoreCardResponse,
	textBodyCardResponse,
	headerActionCardResponse,
	happyBirthdayCardResponse,
	upcomingAppointmentCardResponse,
	vfaCardResponse,
	onboardingCardResponse
]
module.exports = cardResponses
