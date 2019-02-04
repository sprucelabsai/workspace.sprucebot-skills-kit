import React from 'react'
import { shallow } from 'enzyme'

import HeaderControls from '../../../components/BigCalendar/components/HeaderControls/HeaderControls'

describe('HeaderControl tests', () => {
	let renderedComponent
	let pagination
	let selectedDateButton
	let calendarIconButton

	beforeEach(() => {
		renderedComponent = shallow(
			<HeaderControls
				onChangeView={() => {}}
				onBackDate={() => {}}
				onNextDate={() => {}}
			/>
		)

		pagination = renderedComponent.find('Pagination')
		selectedDateButton = renderedComponent.find(
			'.bigcalendar__selectedDate-button'
		)
		calendarIconButton = renderedComponent.find(
			'.bigcalendar__calendarIcon-button'
		)
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(selectedDateButton.exists()).toEqual(true)
		expect(calendarIconButton.exists()).toEqual(true)
		expect(pagination.exists()).toEqual(true)
	})
})
