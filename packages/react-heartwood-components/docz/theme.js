import React from 'react'
import { ComponentsProvider, theme } from 'docz'
import * as components from './components/index'

const map = {
	page: components.Page,
	h1: components.H1
}

const Theme = ({ children }) => (
	<div>
		<ComponentsProvider components={map}>{children}</ComponentsProvider>
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
