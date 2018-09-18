import React from 'react'
import ControlButton from './ControlButton'
import { shallow } from 'enzyme'

describe('ControlButton tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<ControlButton />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
