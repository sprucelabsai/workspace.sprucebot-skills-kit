import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import Header from '../../../components/BigCalendar/components/Header/Header'

describe('Header tests', () => {
	let renderedComponent
	let monthHeader
	let controls
	let dayOfWeek
	let numericalDate
	let pagination

	beforeEach(() => {
		renderedComponent = shallow(
			<Header
				dateFormat={'MMMM YYYY'}
				selectedDate={moment()}
				selectedView={'Team'}
				onChangeView={() => {}}
				onBackDate={() => {}}
				onNextDate={() => {}}
			/>
		)

		monthHeader = renderedComponent.find('H2')
		controls = renderedComponent.find('HeaderControls')
		dayOfWeek = renderedComponent.find('.dow')
		numericalDate = renderedComponent.find('.day')
		pagination = renderedComponent.find('Pagination')
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(monthHeader.exists()).toEqual(true)
		expect(controls.exists()).toEqual(true)
		expect(dayOfWeek.exists()).toEqual(true)
		expect(numericalDate.exists()).toEqual(true)
		expect(pagination.exists()).toEqual(true)
	})

	it('Displays the correct date', () => {
		expect(monthHeader.children().text()).toEqual(moment().format('MMMM YYYY'))
		expect(dayOfWeek.text()).toEqual(moment().format('dd'))
		expect(numericalDate.text()).toEqual(moment().format('D'))
	})
})
