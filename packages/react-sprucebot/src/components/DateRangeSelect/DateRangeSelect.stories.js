import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import DateRangeSelect from './DateRangeSelect'
import readme from './DateRangeSelect.md'

const availableDays = () => {
	let daysArray = []

	for (let i = 1; i < 30; i++) {
		if (i < 10) {
			daysArray.push(`2018-08-0${i}`)
		} else {
			daysArray.push(`2018-08-${i}`)
		}
	}

	return daysArray
}

const stories = storiesOf('DateRangeSelect', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<DateRangeSelect
				allowPastDates
				bypassDaysBlocked
				onDatesChange={(startDate, endDate) => {
					console.log(startDate, endDate)
				}}
				numberOfMonths={1}
				setDefaultDates
				defaultStartDate={moment('2018-03-28')}
				defaultEndDate={moment()}
			/>
		))
	)
)
