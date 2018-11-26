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

	/** Handler to force the sidebar to collapse */
	forceCloseSidebar: Function,

	/** Set true to expand the sidebar (small screens only) */
	isExpanded: boolean,

	/** Handler to toggle the visibility of the sidebar */
	toggleExpanded: Function
}

const Sidebar = (props: Props) => {
	const { items, forceCloseSidebar, toggleExpanded, isExpanded } = props

	return (
		<aside
			className={cx('sidebar', {
				'sidebar--is-collapsed': !isExpanded
			})}
		>
			<SidebarExpander
				toggleExpanded={toggleExpanded}
				isExpanded={isExpanded}
				forceCloseSidebar={forceCloseSidebar}
			/>
			<ul className="sidebar__inner">
				{items.map((item, idx) => (
					<SidebarItem key={idx} {...item} />
				))}
			</ul>
			<SidebarFooter />
		</aside>
	)
}

export default Sidebar
