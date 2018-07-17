import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Calendar from '../lib/components/Calendar/Calendar'
import { Tabs, TabPane } from '../lib/components/Tabs/Tabs'
import readme from './docs/Calendar.md'

const events = [
	{
		start: moment(`2018-08-10 08:00:00`).toDate(),
		end: moment(`2018-08-10 17:00:00`).toDate(),
		title: 'Big Day!'
	},
	{
		start: moment(`2018-08-05 07:00:00`).toDate(),
		end: moment(`2018-08-05 15:00:00`).toDate(),
		title: 'Be awesome 🔥'
	},
	{
		start: moment(`2018-08-01 05:00:00`).toDate(),
		end: moment(`2018-08-01 12:00:00`).toDate(),
		title: '🍁🍁..fall..🍁🍁'
	},
	{
		start: moment(`2018-08-23 10:00:00`).toDate(),
		end: moment(`2018-08-23 22:00:00`).toDate(),
		title: '🎇🎆🎇🎆🎇🎆'
	},
	{
		start: moment(`2018-08-30 03:00:00`).toDate(),
		end: moment(`2018-08-30 20:00:00`).toDate(),
		title: 'Skydiving!'
	},
	{
		start: moment(`2018-08-01 08:00:00`).toDate(),
		end: moment(`2018-08-15 17:00:00`).toDate(),
		title: 'VACATION!',
		allDay: true
	}
]

const weekStyles = {
	postion: 'relative',
	width: '1000px',
	'overflow-x': 'scroll'
}

const stories = storiesOf('Calendar', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<Calendar
					toolbar={true}
					height="1000px"
					date={new Date('2018-08-10 01:00:00')}
					events={events}
					defaultView={'day'}
					views={['day', 'week', 'month']}
				/>
			</div>
		))
	)
)
