import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import Day from '../../../components/BigCalendar/components/Views/Day'
import users from '../../../__mocks__/stubs/users'
import location from '../../../__mocks__/stubs/location'

describe('Day View tests', () => {
	let renderedComponent
	let teammateHeader
	let timeGutter

	beforeEach(() => {
		renderedComponent = shallow(
			<Day
				onScroll={() => {}}
				viewHeight={0}
				hours={[]}
				users={users}
				location={location}
				minTime={'00:00'}
				maxTime={'23:59'}
			/>
		)

		teammateHeader = renderedComponent.find('TeammateHeader')
		timeGutter = renderedComponent.find('TimeGutter')
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(teammateHeader.exists()).toEqual(true)
		expect(timeGutter.exists()).toEqual(true)
	})
})
