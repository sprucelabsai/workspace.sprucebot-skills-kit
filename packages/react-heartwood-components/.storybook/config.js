import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { addReadme } from 'storybook-readme'
import { themes } from '@storybook/theming'
import { boolean } from '@storybook/addon-knobs/react'

import theme from './theme'
import Wrapper from './Wrapper'

addParameters({
	options: {
		theme
	}
})

addDecorator(jsxDecorator)
addDecorator(withPropsTable)
addDecorator(addReadme)

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

function loadStories() {
	const req = require.context('../src/components', true, /\-story\.js|ts|tsx$/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
