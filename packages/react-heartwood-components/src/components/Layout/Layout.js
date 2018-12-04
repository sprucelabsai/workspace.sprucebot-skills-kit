// @flow
import React from 'react'
import cx from 'classnames'

export type LayoutProps = {
	/** Contents of the Layout. Should be LayoutSection components */
	children: Node,

	/** Set true to center align layout content. */
	isCentered?: boolean,

	/** Set true to remove horizontal padding from layout. */
	isFullBleed?: boolean,

	/** Sets the width of the layout */
	width?: 'base' | 'wide' | 'full-width'
}

const Layout = (props: LayoutProps) => {
	const { children, isCentered, isFullBleed, width, className } = props

	return (
		<div
			className={cx('layout', className, {
				'layout--centered': isCentered,
				'layout--wide': width === 'wide',
				'layout--full-width': width === 'full-width',
				'layout--full-bleed': isFullBleed
			})}
		>
			{children}
		</div>
	)
}

Layout.defaultProps = {
	isCentered: false,
	width: 'base',
	isFullBleed: false
}

export default Layout
