import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Wrapper from './Wrapper'

import { setOptions } from '@storybook/addon-options'

setOptions({
	name: 'Heartwood React Components',
	url:
		'https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/tree/dev/packages/react-sprucebot'
})

addDecorator(story => {
	if (
		story().props.STORYBOOKdoNotWrap ||
		(story().props.children && story().props.children.props.STORYBOOKdoNotWrap)
	) {
		return story()
	}
	return <Wrapper>{story()}</Wrapper>
})

function loadStories() {
	const req = require.context('../src/components', true, /\-story\.js$/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
