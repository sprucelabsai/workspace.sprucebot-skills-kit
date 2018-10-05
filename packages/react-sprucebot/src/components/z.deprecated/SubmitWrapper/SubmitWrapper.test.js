import React from 'react'
import SubmitWrapper from './SubmitWrapper'
import { shallow } from 'enzyme'

describe('SubmitWrapper tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<SubmitWrapper />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
