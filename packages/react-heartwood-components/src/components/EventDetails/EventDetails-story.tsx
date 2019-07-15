import React from 'react'
import { storiesOf } from '@storybook/react'

import { Sidebar } from '../Core'
import EventDetails from './EventDetails'

import {
	appointment,
	warningAppointment,
	pastAppointment,
	lunchBreak,
	ptoBlock
} from '../../../.storybook/data/eventDetails'

const stories = storiesOf('EventDetails', module)

stories
	.add('Booking: Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<EventDetails {...appointment} />
		</Sidebar>
	))
	.add('Booking: Appointment has warning', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<EventDetails {...warningAppointment} />
		</Sidebar>
	))
	.add('Booking: Past Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<EventDetails {...pastAppointment} />
		</Sidebar>
	))
	.add('Scheduling: Lunch Break', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<EventDetails {...lunchBreak} />
		</Sidebar>
	))

	.add('Scheduling: PTO', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<EventDetails {...ptoBlock} />
		</Sidebar>
	))
