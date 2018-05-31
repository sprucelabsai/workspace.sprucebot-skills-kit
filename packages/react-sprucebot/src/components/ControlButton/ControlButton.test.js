import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import ControlButton from './ControlButton'

test('it renders', () => {
	const tree = renderer.create(<ControlButton />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('it renders a link', () => {
	const tree = renderer
		.create(<ControlButton href="https://sprucebot.com" />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
