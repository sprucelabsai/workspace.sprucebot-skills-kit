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
} from './eventDetailsMock'
import { boolean, withKnobs } from '@storybook/addon-knobs'

const stories = storiesOf('EventDetails', module)

// TODO: Turn off this decorator for specs. It obfuscates prop tables.
// stories.addDecorator(storyFn => (
// 	<Page STORYBOOKwrap={false} sidebar={storyFn()} />
// ))

stories.addDecorator(withKnobs)

stories
	.add('Booking: Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails isLoading={boolean('isLoading', false)} {...appointment} />
		</Sidebar>
	))
	.add('Booking: Appointment has warning', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails
				isLoading={boolean('isLoading', false)}
				{...warningAppointment}
			/>
		</Sidebar>
	))
	.add('Booking: Past Appointment', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Appointment details" onClose={() => null} />
			<EventDetails
				isLoading={boolean('isLoading', false)}
				{...pastAppointment}
			/>
		</Sidebar>
	))
	.add('Scheduling: Lunch Break', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="Lunch break" onClose={() => null} />
			<EventDetails isLoading={boolean('isLoading', false)} {...lunchBreak} />
		</Sidebar>
	))

	.add('Scheduling: PTO', () => (
		<Sidebar side="right" isCollapsible={false} isLarge>
			<SidebarHeader title="PTO" onClose={() => null} />
			<EventDetails isLoading={boolean('isLoading', false)} {...ptoBlock} />
		</Sidebar>
	))
