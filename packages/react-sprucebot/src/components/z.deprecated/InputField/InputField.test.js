import React from 'react'
import InputField from './InputField'
import { shallow } from 'enzyme'

describe('InputField tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<InputField />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
