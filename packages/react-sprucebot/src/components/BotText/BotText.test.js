import React from 'react'
import BotText from './BotText'
import { shallow } from 'enzyme'

describe('BotText tests', () => {
	it('Should match the snapshot', () => {
		const renderedComponent = shallow(<BotText />)

		expect(renderedComponent).toMatchSnapshot()
	})
})
