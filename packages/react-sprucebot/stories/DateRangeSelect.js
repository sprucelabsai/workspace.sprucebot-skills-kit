import React from 'react'
import moment from 'moment'
import requiredIf from 'react-required-if'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import {
	withKnobs,
	boolean,
	select,
	button
} from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import DateRangeSelect from '../lib/components/DateRangeSelect/DateRangeSelect'
import readme from './docs/DateRangeSelect.md'

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

const handleOnDatesChange = () => console.log('Date changed')

const stories = storiesOf('DateRangeSelect', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
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
			</div>
		))
	)
)
