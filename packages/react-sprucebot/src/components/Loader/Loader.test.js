import React from 'react'
import Loader from './Loader'
import { shallow } from 'enzyme'

describe('Loader tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Loader />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
