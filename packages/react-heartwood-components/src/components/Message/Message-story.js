// @flow
import React from 'react'
import moment from 'moment-timezone'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object
} from '@storybook/addon-knobs/react'
import Message, { MessageBuilder } from './index'
import Page, { PageContent } from '../Page'
import Layout, { LayoutSection } from '../Layout'
import Text from '../Text/Text'

const fromName = 'Sprucebot'
const fromImage =
	'https://cloudsky1080.files.wordpress.com/2018/08/grumpycat.png?w=128'

const messageJSON = {
	from: {
		name: fromName,
		image: fromImage
	},
	dateSent: moment(),
	message: {
		text: `{{name}} has an {{appointment}} scheduled for {{date}}`,
		context: {
			name: {
				type: 'text',
				props: { element: 'a', children: 'Dorian Feeney' }
			},
			appointment: {
				type: 'text',
				props: { element: 'a', children: 'upcoming appointment' }
			},
			date: {
				type: 'textStyle',
				props: { type: 'strong', children: 'February 12th' }
			}
		}
	},
	detail: 'Booked via Booking Skill',
	primaryAction: {
		text: 'Confirm Appointment',
		href: '#',
		target: '_blank'
	},
	replies: [
		{
			type: 'critical',
			text: 'Dorian is not receiving notifications. {{call}}',
			context: {
				call: {
					type: 'button',
					props: { href: '#', text: 'Call Dorian', target: '_blank' }
				}
			}
		},
		{
			type: 'warn',
			text: 'Dorian has not confirmed this appointment yet. {{call}}',
			context: {
				call: {
					type: 'button',
					props: { href: '#', text: 'Call Dorian', target: '_blank' }
				}
			}
		},
		{
			type: 'success',
			text: 'Appointment was confirmed by {{teammate}}',
			context: {
				teammate: {
					type: 'button',
					props: { href: '#', text: 'Camila Hintz', target: '_blank' }
				}
			}
		}
	],
	attachments: [
		{
			type: 'image',
			props: {
				src:
					'https://c8.alamy.com/comp/CRJ923/young-customer-service-man-with-brace-doing-the-ok-sign-CRJ923.jpg'
			}
		}
	]
}

const stories = storiesOf('Message', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(story => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>{story()}</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
))

stories.addDecorator(withKnobs)

stories
	.add('Message', () => (
		<Message
			from={{ name: '', image: '', alt: '', id: '' }}
			dateSent={moment()}
		>
			It's lonely over here.
		</Message>
	))
	.add('MessageBuilder', () => [
		<MessageBuilder {...object('json', messageJSON)} />
	])
