import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import HeaderControls from '../../../components/BigCalendar/components/HeaderControls/HeaderControls'

describe('HeaderControl tests', () => {
	let renderedComponent
	let pagination
	let selectedDateButton
	let calendarIconButton
	let viewSelect

	beforeEach(() => {
		renderedComponent = shallow(
			<HeaderControls
				onChangeView={() => {}}
				onBackDate={() => {}}
				onNextDate={() => {}}
				onChangeView={() => {}}
				userModeOptions={[]}
				onChangeUserMode={() => {}}
				onSelectDate={() => {}}
				onDateToToday={() => {}}
				selectedDate={moment()}
			/>
		)

		pagination = renderedComponent.find('Pagination')
		selectedDateButton = renderedComponent.find(
			'.bigcalendar__selectedDate-button'
		)
		calendarIconButton = renderedComponent.find(
			'.bigcalendar__calendarIcon-button'
		)
		viewSelect = renderedComponent.find('Select')
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(selectedDateButton.exists()).toEqual(true)
		expect(calendarIconButton.exists()).toEqual(true)
		expect(pagination.exists()).toEqual(true)
	})
})
