import React from 'react'
import IconButton from './IconButton'
import { shallow } from 'enzyme'

describe('IconButton tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<IconButton />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
