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
	let dragGrid

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
			onDropEvent: jest.fn(),
			onDragEvent: jest.fn(),
			scrollDuringDragMargin: 0,
			dragScrollSpeed: 100,
			eventRightMargin: 2,
			longPressDelay: 2,
			allowResizeToZeroDurationBlocks: true,
			getStartTimeForUser: jest.fn(),
			getEndTimeForUser: jest.fn()
		}

		renderedComponent = mount(<Day {...props} />)

		teammateHeader = renderedComponent.find('TeammateHeader')
		timeGutter = renderedComponent.find('TimeGutter')
		dragGrid = renderedComponent.find('DragGrid')
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(teammateHeader.exists()).toEqual(true)
		expect(timeGutter.exists()).toEqual(true)
		expect(dragGrid.exists()).toEqual(true)
	})

	it('Includes all the correct propTypes', () => {
		expect(renderedComponent.prop('onScroll')).toBeType('function')
		expect(renderedComponent.prop('viewHeight')).toBeType('number')
		expect(renderedComponent.prop('hours')).toBeType('array')
		expect(renderedComponent.prop('location')).toBeType('object')
		expect(renderedComponent.prop('minTime')).toBeType('string')
		expect(renderedComponent.prop('maxTime')).toBeType('string')
		expect(renderedComponent.prop('events')).toBeType('array')
		expect(renderedComponent.prop('dragThreshold')).toBeType('number')
		expect(renderedComponent.prop('showRightProps')).toBeType('boolean')
		expect(renderedComponent.prop('startTime')).toBeType('string')
		expect(renderedComponent.prop('endTime')).toBeType('string')
		expect(renderedComponent.prop('slotsPerHour')).toBeType('number')
		expect(renderedComponent.prop('onUpdateHorizontalPagerDetails')).toBeType(
			'function'
		)
		expect(renderedComponent.prop('startDate')).toBeType('object')
		expect(renderedComponent.prop('onDropEvent')).toBeType('function')
	})
})
