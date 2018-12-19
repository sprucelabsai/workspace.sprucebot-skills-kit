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

	/** Set false to add extra spacing to top of page when there is no PageHeader. */
	hasHeader?: boolean,

	/** Optional classname */
	className?: string
}

export const Page = (props: PageProps) => {
	const { children, isCentered, hasHeader, className } = props
	return (
		<div
			className={cx('page', className, {
				'page--centered': isCentered,
				'page--no-header': !hasHeader
			})}
		>
			{children}
		</div>
	)
}

Page.defaultProps = {
	isCentered: false,
	hasHeader: true
}

export default Page
