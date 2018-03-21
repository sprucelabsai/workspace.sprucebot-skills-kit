import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import SelectField from './SelectField'
import FormField from '../FormField/FormField'

test('it renders a FormField', () => {
	const wrapper = shallow(
		<SelectField input={{ value: 'test', onChange: jest.fn() }} meta={{}}>
			<option value="testval" />
		</SelectField>
	)

	expect(wrapper).toMatchSnapshot()

	expect(wrapper.find(FormField)).toHaveLength(1)
})
