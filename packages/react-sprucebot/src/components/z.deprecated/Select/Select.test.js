import React from 'react'
import Select from './Select'
import { shallow } from 'enzyme'

describe('Select tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Select />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
