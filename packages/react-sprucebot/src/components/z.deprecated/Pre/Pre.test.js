import React from 'react'
import Pre from './Pre'
import { shallow } from 'enzyme'

describe('Pre tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Pre />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
