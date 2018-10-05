import React from 'react'
import Switch from './Switch'
import { shallow } from 'enzyme'

describe('Switch tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Switch />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
