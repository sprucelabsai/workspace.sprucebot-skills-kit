import React from 'react'
import { ComponentsProvider, theme } from 'docz'
import components from './components'

const map = {}

const Theme = ({ children }) => (
	<div>
		<ComponentsProvider components={components}>{children}</ComponentsProvider>
	</div>
)

const themeConfig = {
	colors: {
		primary: 'tomato',
		secondary: 'khaki',
		gray: 'lightslategray'
	}
}

export default theme(themeConfig)(Theme)
