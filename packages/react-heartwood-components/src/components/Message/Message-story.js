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

const messageJSON = {
	fromName: 'Sprucebot',
	fromImage:
		'https://cloudsky1080.files.wordpress.com/2018/08/grumpycat.png?w=128',
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
	replies: [
		{
			type: 'success',
			text: 'Dorian is not receiving notifications. {{call}}',
			context: {
				call: {
					type: 'text',
					props: { element: 'a', children: 'Call Dorian' }
				}
			}
		},
		{
			type: 'success',
			text: 'Dorian is not receiving notifications. {{call}}',
			context: {
				call: {
					type: 'text',
					props: { element: 'a', children: 'Call Dorian' }
				}
			}
		},
		{
			type: 'success',
			text:
				'Dorian has not confirmed the appointment yet. {{confirm}} or {{call}}',
			context: {
				confirm: {
					type: 'text',
					props: { element: 'a', children: 'Confirm Appointment' }
				},
				call: {
					type: 'text',
					props: { element: 'a', children: 'Call Dorian' }
				}
			}
		},
		{
			type: 'success',
			text: 'Appointment was confirmed by {{teammate}}',
			context: {
				teammate: {
					type: 'text',
					props: { element: 'a', children: 'Camila Hintz' }
				}
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
	.add('Message', () => <Message>It's lonely over here.</Message>)
	.add('MessageBuilder', () => [
		<MessageBuilder {...object('json', messageJSON)} />
	])
