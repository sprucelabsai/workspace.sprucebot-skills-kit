// @flow
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'

// Card
type PageProps = {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: Node,

	/** Set true to make page content center aligned. */
	isCentered?: boolean,

	/** Optional classname */
	className?: string
}

export const Page = (props: PageProps) => {
	const { children, isCentered, className } = props
	return (
		<div
			className={cx('page', className, {
				'page--centered': isCentered
			})}
		>
			{children}
		</div>
	)
}

Page.defaultProps = {
	isCentered: false
}

export default Page
