// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem, {
	Props as ItemProps
} from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'

type Props = {
	items: Array<ItemProps>,
	forceCloseSidebar: Function,
	isExpanded: boolean,
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
