import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import BigCalendar from '../../../components/BigCalendar/BigCalendar'
import users from '../../../__mocks__/stubs/users'
import events from '../../../__mocks__/stubs/events'
import location from '../../../__mocks__/stubs/location'

describe('BigCalendar tests', () => {
	let renderedComponent
	let header
	let datePagination
	let teamPagination
	let viewWrapper
	let props

	describe('Day View tests', () => {
		let dayView

		beforeEach(() => {
			props = {
				users: users,
				location: location,
				allEvents: events,
				timezone: 'America/Denver'
			}

			renderedComponent = mount(<BigCalendar {...props} />)

			renderedComponent.setState({ selectedView: 'day' })
			header = renderedComponent.find('Header')
			datePagination = renderedComponent.find('Pagination').at(0)
			teamPagination = renderedComponent.find('Pagination').at(1)
			viewWrapper = renderedComponent.find('.bigcalendar__view-wrapper')
			dayView = renderedComponent.find('Day')
		})

		it('Renders', () => {
			expect(renderedComponent.exists()).toEqual(true)
			expect(header.exists()).toEqual(true)
			expect(datePagination.exists()).toEqual(true)
			expect(teamPagination.exists()).toEqual(true)
			expect(viewWrapper.exists()).toEqual(true)
			expect(dayView.exists()).toEqual(true)
		})

		it('Includes all the correct propTypes', () => {
			expect(renderedComponent.prop('users')).toBeType('array')
			expect(renderedComponent.prop('allEvents')).toBeType('array')
			expect(renderedComponent.prop('location')).toBeType('object')
		})

		it('Sets the date back one day when the back date button is clicked', () => {
			const backButton = datePagination.find('button').at(0)

			expect(backButton.exists()).toEqual(true)

			const startDate = renderedComponent.state('startDate')
			backButton.simulate('click')
			const expectedBack = startDate.subtract(1, 'day')
			expect(renderedComponent.state('startDate')).toEqual(expectedBack)
		})

		it('Sets the date forward one day when the next date button is clicked', () => {
			const nextButton = datePagination.find('button').at(1)

			expect(nextButton.exists()).toEqual(true)

			const startDate = renderedComponent.state('startDate')
			nextButton.simulate('click')
			const expectedNext = startDate.add(1, 'day')
			expect(renderedComponent.state('startDate')).toEqual(expectedNext)
		})

		it('Renders a column for each user', () => {
			expect(renderedComponent.find('DayCol').length).toEqual(users.length)
		})
	})
})
