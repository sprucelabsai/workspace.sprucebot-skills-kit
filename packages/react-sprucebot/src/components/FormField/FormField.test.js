import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import FormField from './FormField'
const onChange = jest.fn()

test('it renders set value and triggers onChange', () => {
	const wrapper = shallow(
		<FormField
			type="text"
			input={{ value: 'test1', onChange }}
			meta={{ touched: false }}
		>
			<input />
		</FormField>
	)
	expect(wrapper).toMatchSnapshot()
	wrapper
		.find('input[type="text"]')
		.simulate('change', { target: { value: 'test' } })
	expect(onChange).toHaveBeenCalledWith({ target: { value: 'test' } })
})

test('it renders with a label, finePrint, placeholder, and error', () => {
	const wrapper = shallow(
		<FormField
			label="Test Label"
			placeholder="Placeholdn'"
			type="text"
			input={{ value: 'test2', onChange }}
			meta={{ touched: true, error: 'TEST ERROR' }}
			finePrint="Fine Print!"
		>
			<input />
		</FormField>
	)
	expect(wrapper).toMatchSnapshot()
})
