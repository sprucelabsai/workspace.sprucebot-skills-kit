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
	header?: PageHeaderProps,

	/** Set true if the page has a sidebar. Defaults to ''. */
	hasSidebar?: boolean,

	/** Set true if the page has a sidebar that is collapsed. Defaults to false. */
	sidebarIsCollapsed?: boolean
}

export const Page = (props: PageProps) => {
	const {
		children,
		isCentered,
		hasHeader,
		className,
		header,
		hasSidebar,
		sidebarIsCollapsed
	} = props
	return (
		<div
			className={cx('page', className, {
				'page--centered': isCentered,
				'page--no-header': !hasHeader,
				'page--has-sidebar': hasSidebar,
				'page--sidebar-is-collapsed': sidebarIsCollapsed
			})}
		>
			{header && <PageHeader {...header} />}
			{children}
		</div>
	)
}

Page.defaultProps = {
	isCentered: false,
	hasHeader: true,
	header: null,
	hasSidebar: false,
	sidebarIsCollapsed: false
}

export default Page
