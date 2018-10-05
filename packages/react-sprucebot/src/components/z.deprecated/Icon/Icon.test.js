import React from 'react'
import Icon from './Icon'
import { shallow } from 'enzyme'

describe('Icon tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Icon />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
