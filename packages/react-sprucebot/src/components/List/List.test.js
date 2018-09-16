import React from 'react'
import { List } from './List'
import { shallow } from 'enzyme'

describe('List tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<List />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
