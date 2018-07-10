import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Button from './Button'

describe('Button Component', () => {
	test('it renders', () => {
		const tree = renderer.create(<Button />)
		expect(tree).toMatchSnapshot()
	})
})
