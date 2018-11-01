import React from 'react'
import 'jsdom-global/register'
import { mount } from 'enzyme'
import moment from 'moment'

import Day from '../../../components/BigCalendar/components/Views/Day'

import users from '../../../__mocks__/stubs/users'
import location from '../../../__mocks__/stubs/location'
import events from '../../../__mocks__/stubs/events'

describe('Day View tests', () => {
	let renderedComponent
	let props
	let teammateHeader
	let timeGutter

	beforeEach(() => {
		props = {
			onScroll: jest.fn(),
			viewHeight: 0,
			hours: [],
			users: users,
			location: location,
			minTime: '00:00',
			maxTime: '23:59',
			events: events,
			dragThreshold: 10,
			showRightProps: false,
			startTime: '07:00:00',
			endTime: '20:00:00',
			slotsPerHour: 4,
			onUpdateHorizontalPagerDetails: jest.fn(),
			startDate: moment(),
			onDropEvent: jest.fn()
		}

		renderedComponent = mount(<Day {...props} />)

		teammateHeader = renderedComponent.find('TeammateHeader')
		timeGutter = renderedComponent.find('TimeGutter')
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(teammateHeader.exists()).toEqual(true)
		expect(timeGutter.exists()).toEqual(true)
	})
})
