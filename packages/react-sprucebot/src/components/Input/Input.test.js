import React from 'react'
import Input from './Input'
import { shallow } from 'enzyme'

describe('Input tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Input />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
