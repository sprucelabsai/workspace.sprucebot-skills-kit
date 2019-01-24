import uuidv1 from 'uuid/v1'
import moment from 'moment-timezone'

const guestFirstName = 'Dorian'

const senders = {
	sprucebot: {
		id: uuidv1(),
		name: 'Sprucebot',
		image:
			'https://avatars.slack-edge.com/2018-11-06/472651022816_ae5d32dda0401e3c2e81_88.png'
	},
	teammate01: {
		id: uuidv1(),
		name: 'Camila Hintz',
		image:
			'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=80&h=80&q=80'
	}
}

const guests = {
	dorianFeeney: {
		firstName: 'Dorian',
		name: 'Dorian Feeney'
	}
}

export const messages = [
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment(),
		message: {
			text: '{{guest}} submitted a review of {{teammate}}: {{review}}',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				},
				teammate: {
					type: 'text',
					props: { element: 'span', children: senders.teammate01.name }
				},
				review: {
					type: 'text',
					props: {
						element: 'blockquote',
						children:
							'Camila is the best! she was courteous, funny, and gave me a great haircut. 10 outta 10!'
					}
				}
			}
		}
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(173, 'minutes'),
		message: {
			text:
				'I just asked {{guest}} to review their most recent appointment. Good luck!',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				}
			}
		},
		detail: 'Request sent from Reviews skill'
	},
	{
		from: senders.teammate01,
		dateSent: moment().subtract(200, 'minutes'),
		message: {
			text: 'Hey Dorian, thanks for stopping by! I hope to see you again soon.',
			context: {}
		}
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(201, 'minutes'),
		message: {
			text: "{{guest}}'s {{payment}} has been processed",
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				},
				payment: {
					type: 'text',
					props: { element: 'a', href: '#', children: 'payment' }
				}
			}
		}
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(208, 'minutes'),
		message: {
			text: '{{guest}} has an {{appointment}} ending in 5 minutes.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				},
				appointment: {
					type: 'text',
					props: { element: 'a', href: '#', children: 'appointment' }
				}
			}
		},
		replies: [
			{
				type: 'success',
				text: 'Sent to checkout'
			}
		]
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(268, 'minutes'),
		message: {
			text: '{{guest}} has an {{upcoming appointment}} in 5 minutes.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guestFirstName }
				},
				'upcoming appointment': {
					type: 'text',
					props: { element: 'a', href: '#', children: 'upcoming appointment' }
				}
			}
		},
		replies: [
			{
				type: 'success',
				text: 'Checked in by {{teammate}} at {{time}}',
				context: {
					teammate: {
						type: 'text',
						props: { element: 'span', children: senders.teammate01.name }
					},
					time: {
						type: 'text',
						props: {
							element: 'span',
							children: 'xx:xxpm'
						}
					}
				}
			}
		]
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(276, 'minutes'),
		message: {
			text: '{{guest}} connected to the in-store wifi.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				}
			}
		}
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(734, 'minutes'),
		message: {
			text: '{{guest}} booked an appointment for {{appointment}}.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				},
				appointment: {
					type: 'text',
					props: {
						element: 'a',
						href: '#',
						children: 'The Regular with Camila Hintz today at 3pm'
					}
				}
			}
		},
		detail: 'Booked via Booking skill',
		replies: [
			{
				type: 'success',
				text: 'Appointment confirmed by {{teammate}} at xx:xxpm',
				context: {
					teammate: {
						type: 'text',
						props: { element: 'span', children: senders.teammate01.name }
					}
				}
			}
		]
	},
	{
		from: senders.sprucebot,
		isFromSprucebot: true,
		dateSent: moment().subtract(8, 'days'),
		message: {
			text:
				"Welcome to the feed. This is where you can find out what's happening with {{guest}}",
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guests.dorianFeeney.firstName }
				}
			}
		}
	}
]
