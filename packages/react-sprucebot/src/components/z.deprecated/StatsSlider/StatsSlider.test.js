import React from 'react'
import StatsSlider from './StatsSlider'
import { shallow } from 'enzyme'

describe('StatsSlider tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<StatsSlider />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
