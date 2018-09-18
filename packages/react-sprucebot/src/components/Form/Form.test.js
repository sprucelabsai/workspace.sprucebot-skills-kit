import React from 'react'
import Form from './Form'
import { shallow } from 'enzyme'

describe('Form tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Form />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
