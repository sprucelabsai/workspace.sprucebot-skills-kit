import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { addReadme } from 'storybook-readme'
import { themes } from '@storybook/theming'

import theme from './theme'

addParameters({
	options: {
		theme
	}
})

addDecorator(jsxDecorator)
addDecorator(withPropsTable)
addDecorator(addReadme)

function loadStories() {
	const req = require.context('../src/components', true, /\-story\.js|ts|tsx$/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
