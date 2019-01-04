// @flow
import React from 'react'
import cx from 'classnames'
import type { Node } from 'react'

type Props = {
	/** Children to show in the sidebar section */
	children: Node,

	/** Optional classname to add to the section */
	className?: string,

	/** Set true to center align horizontally */
	isCentered?: boolean,

	/** Spacing options */
	spacing?: 'base' | 'loose'
}

const SidebarSection = (props: Props) => {
	const { children, className, isCentered, spacing } = props
	return (
		<div
			className={cx('sidebar-section', className, {
				'sidebar-section--centered': isCentered,
				'sidebar-section--loose': spacing === 'loose'
			})}
		>
			{children}
		</div>
	)
}

SidebarSection.defaultProps = {
	className: '',
	isCentered: false,
	spacing: 'base'
}

export default SidebarSection
