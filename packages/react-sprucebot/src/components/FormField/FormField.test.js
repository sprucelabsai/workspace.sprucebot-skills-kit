import React from 'react'
import FormField from './FormField'
import { shallow } from 'enzyme'

describe('FormField tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<FormField />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
