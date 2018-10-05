import React from 'react'
import { Tabs } from './Tabs'
import { shallow } from 'enzyme'

describe('Tabs tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Tabs />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
