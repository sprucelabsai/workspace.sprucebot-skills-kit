// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem from './components/SidebarItem/SidebarItem'
import type { Props as ItemProps } from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'

type Props = {
	/** Items to display in the sidebar */
	items: Array<ItemProps>,

	/** Include a footer in the sidebar */
	footer?: Node,

	/** Set which side the sidebar is on. Must be either 'left' or 'right */
	side: 'left' | 'right',

	/** Set true to make the sidebar larger. Defaults to false. */
	isLarge?: boolean,

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
		footer,
		forceCloseSidebar,
		toggleExpanded,
		isExpanded,
		isLarge,
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
			<ul className="sidebar__inner">
				{items &&
					items.length > 0 &&
					items.map((item, idx) => <SidebarItem key={idx} {...item} />)}
			</ul>
			{footer && footer}
			<SidebarExpander
				toggleExpanded={toggleExpanded}
				isExpanded={isExpanded}
				forceCloseSidebar={forceCloseSidebar}
			/>
		</aside>
	)
}

Sidebar.defaultProps = {
	isLarge: false,
	footer: null
}

export default Sidebar
