import React from 'react'
import Pager from './Pager'
import { shallow } from 'enzyme'

describe('Pager tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Pager />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
