import React from 'react'
import Avatar from './Avatar'
import { shallow } from 'enzyme'

describe('Avatar tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<Avatar />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
