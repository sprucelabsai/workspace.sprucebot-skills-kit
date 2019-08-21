import React from 'react'
import { storiesOf } from '@storybook/react'

import EventDetails from './EventDetails'

import { Sidebar, SidebarHeader } from '../Core'
// import Page from '../Page'

import {
	appointment,
	warningAppointment,
	pastAppointment,
	lunchBreak,
	ptoBlock
} from '../../../.storybook/data/eventDetails'

const stories = storiesOf('EventDetails', module)

// TODO: Turn off this decorator for specs. It obfuscates prop tables.
// stories.addDecorator(storyFn => (
// 	<Page STORYBOOKwrap={false} sidebar={storyFn()} />
// ))

stories
	.add('Booking: Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails {...appointment} />
		</Sidebar>
	))
	.add('Booking: Appointment has warning', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails {...warningAppointment} />
		</Sidebar>
	))
	.add('Booking: Past Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails {...pastAppointment} />
		</Sidebar>
	))
	.add('Scheduling: Lunch Break', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Lunch break" onClose={() => null} />
			<EventDetails {...lunchBreak} />
		</Sidebar>
	))

	.add('Scheduling: PTO', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="PTO" onClose={() => null} />
			<EventDetails {...ptoBlock} />
		</Sidebar>
	))
