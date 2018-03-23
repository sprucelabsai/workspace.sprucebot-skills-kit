import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import InputField from './InputField'
import FormField from '../FormField/FormField'

test('it renders a FormField', () => {
	const wrapper = shallow(
		<InputField input={{ value: 'test', onChange: jest.fn() }} meta={{}} />
	)

	expect(wrapper).toMatchSnapshot()

	expect(wrapper.find(FormField)).toHaveLength(1)
})
