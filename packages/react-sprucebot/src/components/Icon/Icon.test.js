import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Icon from './Icon'

test('it renders', () => {
	const tree = renderer.create(<Icon />).toJSON()
	expect(tree).toMatchSnapshot()
})
