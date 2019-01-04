// @flow
import React from 'react'
import type { Node } from 'react'

type Props = {
	children: Node
}

export default (props: Props) => (
	<div className="sidebar-section">{props.children}</div>
)
