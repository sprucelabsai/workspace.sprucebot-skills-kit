// @flow
import React, { Node } from 'react'
import cx from 'classnames'
import LayoutSection from './components/LayoutSection/LayoutSection'

export type LayoutProps = {
	/** Contents of the Layout. Should be LayoutSection components */
	children?: Node,

	/** Set true to center align layout content. */
	isCentered?: boolean,

	/** Set true to remove horizontal padding from layout. */
	isFullBleed?: boolean,

	/** Sets the width of the layout */
	width?: 'base' | 'tight' | 'wide' | 'full-width',

	/** any classes applied to the div */
	className?: string
}

const Layout = (props: LayoutProps) => {
	const { children, isCentered, isFullBleed, width, className } = props

	return (
		<div
			className={cx('layout', className, {
				'layout--centered': isCentered,
				'layout--wide': width === 'wide',
				'layout--tight': width === 'tight',
				'layout--full-width': width === 'full-width',
				'layout--full-bleed': isFullBleed
			})}
		>
			{children}
		</div>
	)
}

Layout.Section = LayoutSection

Layout.defaultProps = {
	isCentered: false,
	width: 'base',
	isFullBleed: false
}

export default Layout
