import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import IconButton from './IconButton'

test('it renders', () => {
	const tree = renderer.create(<IconButton />).toJSON()
	expect(tree).toMatchSnapshot()
})
