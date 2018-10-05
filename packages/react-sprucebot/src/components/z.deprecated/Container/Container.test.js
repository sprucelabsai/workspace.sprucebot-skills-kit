import React from 'react'
import Container from './Container'
import { shallow } from 'enzyme'

describe('Container tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Container />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
