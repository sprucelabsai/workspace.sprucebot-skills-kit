// @flow
import React from 'react'

export type LayoutProps = {
	/** Contents of the Layout. Should be LayoutSection components */
	children: Node
}

const Layout = (props: LayoutProps) => {
	const { children } = props

	return <div className="layout">{children}</div>
}

export default Layout
