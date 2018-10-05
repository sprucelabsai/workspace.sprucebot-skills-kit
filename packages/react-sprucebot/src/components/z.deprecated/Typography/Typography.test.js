import React from 'react'
import { Paragraph, H1, H2, H3, H4, H5, H6, A } from './Typography'
import { shallow } from 'enzyme'

describe('H1 tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<H1 />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
