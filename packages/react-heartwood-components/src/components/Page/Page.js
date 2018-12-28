// @flow
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import PageHeader from './components/PageHeader/PageHeader'
import type { PageHeaderProps } from './components/PageHeader/PageHeader'

// Card
type PageProps = {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: Node,

	/** Set true to make page content center aligned. */
	isCentered?: boolean,

	/** Set false to add extra spacing to top of page when there is no PageHeader. */
	hasHeader?: boolean,

	/** Optional classname */
	className?: string,

	/** Page header props */
	pageHeader?: PageHeaderProps
}

export const Page = (props: PageProps) => {
	const { children, isCentered, hasHeader, className, pageHeader } = props
	return (
		<main
			className={cx('page', className, {
				'page--centered': isCentered,
				'page--no-header': !hasHeader
			})}
		>
			{pageHeader && <PageHeader {...pageHeader} />}
			{children}
		</main>
	)
}

Page.defaultProps = {
	isCentered: false,
	hasHeader: true,
	pageHeader: null
}

export default Page
