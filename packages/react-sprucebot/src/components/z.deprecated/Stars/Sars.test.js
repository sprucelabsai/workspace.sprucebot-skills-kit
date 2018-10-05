import React from 'react'
import Stars from './Stars'
import { shallow } from 'enzyme'

describe('Stars tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Stars />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
