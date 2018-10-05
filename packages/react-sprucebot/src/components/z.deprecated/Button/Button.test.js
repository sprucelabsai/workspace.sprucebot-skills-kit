import React from 'react'
import Button from './Button'
import { shallow } from 'enzyme'

describe('Button tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Button />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
