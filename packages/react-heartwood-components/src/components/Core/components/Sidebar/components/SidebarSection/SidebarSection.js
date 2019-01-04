// @flow
import React from 'react'
import cx from 'classnames'
import type { Node } from 'react'

type Props = {
	children: Node,
	className?: string
}

const SidebarSection = (props: Props) => (
	<div className={cx('sidebar-section', props.className)}>{props.children}</div>
)

SidebarSection.defaultProps = {
	className: ''
}

export default SidebarSection
