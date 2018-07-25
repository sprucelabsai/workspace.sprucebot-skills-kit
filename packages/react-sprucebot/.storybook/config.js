import 'storybook-readme/register'
import { addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { setDefaults } from '@storybook/addon-info'
import backgrounds from '@storybook/addon-backgrounds'

// addon-info
setDefaults({
	header: false, // Toggles display of header with component name and description
	inline: true
})

// backgrounds
addDecorator(
	backgrounds([
		{
			name: 'Default',
			value: '#ffffff',
			default: true
		},
		{
			name: 'Sprucebot Gradient',
			value: 'linear-gradient(90deg, #0088A7, #00B3C7)'
		},
		{
			name: 'Sprucebot Green',
			value: '#00AAC7'
		},
		{
			name: 'Sprucebot Blue',
			value: '#00C8EB'
		},
		{
			name: 'Ulta Pink',
			value: '#ef426d'
		},
		{
			name: 'Ulta Dark Pink',
			value: '#c00b4b'
		},
		{ name: 'twitter', value: '#00aced' },
		{ name: 'facebook', value: '#3b5998' }
	])
)

setOptions({
	name: 'react-sprucebot',
	downPanelInRight: true
})

import { configure } from '@storybook/react'

// const req = require.context('../stories', true, /\.stories\.js$/)
const req = require.context('../src/components', true, /.*\.stories.js$/)

function loadStories() {
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
