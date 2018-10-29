import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'

import BigCalendar from '../../../components/BigCalendar/BigCalendar'
import users from '../../../__mocks__/stubs/users'
import location from '../../../__mocks__/stubs/location'

describe('BigCalendar tests', () => {
	let renderedComponent
	let header
	let viewWrapper

	describe('Day View tests', () => {
		let dayView

		beforeEach(() => {
			renderedComponent = mount(
				<BigCalendar allUsers={users} location={location} />
			)

			renderedComponent.setState({ selectedView: 'day' })
			header = renderedComponent.find('Header')
			viewWrapper = renderedComponent.find('.bigcalendar__view-wrapper')
			dayView = renderedComponent.find('Day')
		})

		it('Renders the Header and Day View', () => {
			expect(renderedComponent.exists()).toEqual(true)
			expect(header.exists()).toEqual(true)
			expect(viewWrapper.exists()).toEqual(true)
			expect(dayView.exists()).toEqual(true)
		})
	})
})
