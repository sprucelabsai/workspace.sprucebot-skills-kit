// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem from './components/SidebarItem/SidebarItem'
import type { Props as ItemProps } from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'

type Props = {
	/** Items to display in the sidebar */
	items?: Array<ItemProps>,

	/** Children to add to the sidebar */
	children?: Node,

	/** Include a footer in the sidebar */
	footer?: Node,

	/** Set which side the sidebar is on. Must be either 'left' or 'right */
	side: 'left' | 'right',

	/** Set true to make the sidebar larger. Defaults to false. */
	isLarge?: boolean,

	/** Enables the user to collapse the sidebar on desktop. Defaults to true. */
	isCollapsible?: boolean,

	/** Handler to force the sidebar to collapse */
	forceCloseSidebar: Function,

	/** Set true to expand the sidebar (small screens only) */
	isExpanded: boolean,

	/** Handler to toggle the visibility of the sidebar */
	toggleExpanded: Function
}

const Sidebar = (props: Props) => {
	const {
		items,
		children,
		footer,
		forceCloseSidebar,
		toggleExpanded,
		isExpanded,
		isLarge,
		isCollapsible,
		side
	} = props

	return (
		<aside
			className={cx('sidebar', {
				'sidebar--left': side === 'left',
				'sidebar--right': side === 'right',
				'sidebar--large': isLarge,
				'sidebar--is-collapsed': !isExpanded
			})}
		>
			<div className="sidebar__inner">
				{items && items.length > 0 && (
					<ul className="sidebar__items">
						{items.map((item, idx) => (
							<SidebarItem key={idx} {...item} />
						))}
					</ul>
				)}
				<div className="sidebar__content">{children && children}</div>
			</div>
			{footer && footer}
			{isCollapsible && (
				<SidebarExpander
					toggleExpanded={toggleExpanded}
					isExpanded={isExpanded}
					forceCloseSidebar={forceCloseSidebar}
				/>
			)}
		</aside>
	)
}

Sidebar.defaultProps = {
	isLarge: false,
	isCollapsible: true,
	items: [],
	children: null,
	footer: null
}

export default Sidebar
