import React from 'react'
import SelectField from './SelectField'
import { shallow } from 'enzyme'

describe('SelectField tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<SelectField />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
