// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import EventDetails, {
	EventDetailsHeader,
	EventDetailsFooter
} from './components/EventDetails'
import Icon from '../Icon/Icon'
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
						icon: <NoteIcon className="u-icon__no-fill u-icon__stroke" />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: (
							<Icon icon="date" className="u-icon__no-fill u-icon__stroke" />
						),
						title: 'Mon, Oct 27, 2018',
						subtitle: '9–10:30am'
					},
					{
						icon: <ServiceIcon className="u-icon__no-fill u-icon__stroke" />,
						title: 'Services',
						subtitle:
							'<p>Beard Tinting</p><p>Head Shave</p><p>$42 | 1hr 30min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon className="u-icon__no-fill u-icon__stroke" />,
						title: 'Status',
						subtitle: 'Not checked in',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
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
