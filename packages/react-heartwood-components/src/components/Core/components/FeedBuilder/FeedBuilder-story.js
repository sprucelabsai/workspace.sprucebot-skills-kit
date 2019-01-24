// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment-timezone'
import FeedBuilder from './FeedBuilder'

const stories = storiesOf('Feed Builder', module)

const fromName = 'Sprucebot'
const fromImage =
	'https://avatars.slack-edge.com/2018-11-06/472651022816_ae5d32dda0401e3c2e81_88.png'

const teammateName = 'Camila Hintz'
const teammateImage =
	'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=80&h=80&q=80'

const guestFirstName = 'Dorian'

const messages = [
	{
		id: '1',
		fromName,
		fromImage,
		dateSent: moment(),
		message: {
			text: 'Dorian submitted a review of {{teammate}}: {{review}}',
			context: {
				teammate: {
					type: 'text',
					props: { element: 'span', children: teammateName }
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
		id: '2',
		fromName,
		fromImage,
		dateSent: moment().subtract(173, 'minutes'),
		message: {
			text:
				'I just asked {{guest}} to review their most recent appointment. Good luck!',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guestFirstName }
				}
			}
		},
		detail: 'Request sent from Reviews skill'
	},
	{
		id: '3',
		fromName: teammateName,
		fromImage: teammateImage,
		dateSent: moment().subtract(200, 'minutes'),
		message: {
			text: 'Hey Dorian, thanks for stopping by! I hope to see you again soon.',
			context: {}
		}
	},
	{
		id: '4',
		fromName,
		fromImage,
		dateSent: moment().subtract(201, 'minutes'),
		message: {
			text: "{{guest}}'s {{payment}} has been processed",
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guestFirstName }
				},
				payment: {
					type: 'text',
					props: { element: 'a', href: '#', children: 'payment' }
				}
			}
		}
	},
	{
		id: '5',
		fromName,
		fromImage,
		dateSent: moment().subtract(208, 'minutes'),
		message: {
			text: '{{guest}} has an {{appointment}} ending in 5 minutes.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guestFirstName }
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
		id: '6',
		fromName,
		fromImage,
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
						props: { element: 'span', children: 'Camila Hintz' }
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
		id: '7',
		fromName,
		fromImage,
		dateSent: moment().subtract(276, 'minutes'),
		message: {
			text: 'Dorian connected to the in-store wifi.',
			context: {}
		}
	},
	{
		id: '8',
		fromName,
		fromImage,
		dateSent: moment().subtract(734, 'minutes'),
		message: {
			text: '{{guest}} booked an appointment for {{appointment}}.',
			context: {
				guest: {
					type: 'text',
					props: { element: 'span', children: guestFirstName }
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
						props: { element: 'span', children: teammateName }
					}
				}
			}
		]
	}
]

stories.add('Basic', () => <FeedBuilder messages={messages} />)
