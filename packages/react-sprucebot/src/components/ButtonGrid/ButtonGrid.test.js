import React from 'react'
import ButtonGrid from './ButtonGrid'
import { shallow } from 'enzyme'

describe('ButtonGrid tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<ButtonGrid />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
