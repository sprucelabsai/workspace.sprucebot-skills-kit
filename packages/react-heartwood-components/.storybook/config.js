import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	number
} from '@storybook/addon-knobs/react'
import Wrapper from './Wrapper'

import { setOptions } from '@storybook/addon-options'
import { withInfo, setDefaults } from '@storybook/addon-info'

setOptions({
	name: 'Heartwood React Components',
	url:
		'https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/tree/dev/packages/react-sprucebot'
})

addDecorator(story => {
	if (
		(story().props && story().props.STORYBOOKdoNotWrap) ||
		(story().props.children &&
			story().props.children.props &&
			story().props.children.props.STORYBOOKdoNotWrap)
	) {
		return story()
	}

	return (
		<Wrapper STORYBOOKwrap={boolean('STORYBOOKwrap', true)}>{story()}</Wrapper>
	)
})

setDefaults({
	propTablesExclude: [Wrapper]
})

addDecorator(
	withInfo({
		inline: false
	})
)

function loadStories() {
	const req = require.context('../src/components', true, /\-story\.js|ts|tsx$/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
