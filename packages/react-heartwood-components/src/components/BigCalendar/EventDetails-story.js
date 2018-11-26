// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import EventDetails, {
	EventDetailsHeader,
	EventDetailsFooter
} from './components/EventDetails'
import NoteIcon from '../../../static/assets/icons/Interface-Essential/Form-Edition/paper-write.svg'
import ServiceIcon from '../../../static/assets/icons/Interface-Essential/Lists/list-bullets-1.svg'
import StatusIcon from '../../../static/assets/icons/Interface-Essential/Time/stopwatch.svg'

const stories = storiesOf('Big Calendar', module)

stories.addDecorator(withKnobs)

stories.add('Event Details', () => (
	<Container>
		<EventDetails
			header={{ title: 'Cooper Moore', label: 'Appointment' }}
			status={select(
				'Status',
				{
					Booked: 'event-busy',
					Unconfirmed: 'event-unconfirmed',
					Break: 'break',
					Block: 'block'
				},
				'event-busy'
			)}
			list={{
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: 'Mon, Oct 27, 2018',
						subtitle: '9–10:30am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle:
							'<p>Beard Tinting</p><p>Head Shave</p><p>$42 | 1hr 30min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Not checked in',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			}}
			footer={{ primaryCTA: { text: 'Check Guest In' } }}
		/>
	</Container>
))
