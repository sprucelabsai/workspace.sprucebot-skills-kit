import React from 'react'
import 'jsdom-global/register'
import { mount } from 'enzyme'
import moment from 'moment'

import DragGrid from '../../../components/BigCalendar/components/DragGrid/DragGrid'

import users from '../../../__mocks__/stubs/users'
import location from '../../../__mocks__/stubs/location'
import events from '../../../__mocks__/stubs/events'

describe('DragGrid behavior', () => {
	let renderedComponent
	let props
	let startDate
	let eventsForDay

	beforeEach(() => {
		startDate = moment()
		eventsForDay = events.filter(e => {
			const eventStart = moment.tz(e.startAt, location.timezone)
			return eventStart.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD')
		})

		props = {
			snapEventToNearestValidX: jest.fn(),
			snapEventToNearestValidY: jest.fn(),
			onScroll: jest.fn(),
			ref: '',
			events: eventsForDay,
			sizeEvent: jest.fn(),
			timezone: location.timezone,
			onDragEvent: jest.fn(),
			onDropEvent: jest.fn(),
			style: { height: 1500 }
		}

		renderedComponent = mount(<DragGrid {...props} />)
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
	})

	it('Renders all events for day', () => {
		expect(renderedComponent.find('Event').length).toEqual(eventsForDay.length)
	})
})
