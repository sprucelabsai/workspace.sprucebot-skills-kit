import React from 'react'
import { mount } from 'enzyme'

import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import FormExample from './FormExample'

import reducers from '../../skillskit/store/reducers'
import withStore from '../../skillskit/store/withStore'

describe.only('FormExample', () => {
	const onSubmit = jest.fn()
	let wrapped
	beforeEach(() => {
		const Page = withStore(({ children }) => children, {
			actions: {},
			reducers,
			config: {
				SERVER_HOST: 'https://example.com'
			}
		})
		wrapped = mount(
			<Page>
				<FormExample onSubmit={onSubmit} />
			</Page>
		)
	})

	test('it renders', () => {
		expect(wrapped).toMatchSnapshot()
	})

	test('it calls onSubmit', async () => {
		const form = wrapped.find('form')

		// Pass Field Validation
		wrapped
			.find('input[name="password"]')
			.simulate('change', { target: { value: 12345678 } })
		wrapped
			.find('select[name="dropdown"]')
			.simulate('change', { target: { value: 'value2' } })

		// Trigger onSubmit handler
		form.simulate('submit')

		// Assert submit called with expected values
		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				dropdown: 'value2',
				firstName: 'Sprucebot',
				password: 12345678
			}),
			expect.anything(),
			expect.anything()
		)
	})
})
