import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { setConfig } from 'next/config'

// Make sure you can use "publicRuntimeConfig" within Storybook.
setConfig({
	publicRuntimeConfig: {
		PRODUCT_NAME: ''
	}
})

import '@sprucelabs/heartwood-components/stylesheets/heartwood-components.scss'

// Add useful info like Prop Tables
addDecorator(
	withInfo({
		inline: false
	})
)

// automatically import all files ending in *.stories.js
const req = require.context(
	'../interface/components',
	true,
	/\-story\.js|ts|tsx$/
)
function loadStories() {
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
