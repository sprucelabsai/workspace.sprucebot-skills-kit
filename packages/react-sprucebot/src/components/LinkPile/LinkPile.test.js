import React from 'react'
import LinkPile from './LinkPile'
import { shallow } from 'enzyme'

describe('LinkPile tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<LinkPile />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
