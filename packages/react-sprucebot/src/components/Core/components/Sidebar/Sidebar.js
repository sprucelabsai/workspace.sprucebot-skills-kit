// @flow
import React, { Component, Fragment } from 'react'
import SidebarItem, {
	Props as ItemProps
} from './components/SidebarItem/SidebarItem'

type Props = {
	items: Array<ItemProps>
}

const Sidebar = (props: Props) => {
	const { items } = props

	return (
		<aside className="sidebar">
			<ul className="sidebar__inner">
				{items.map((item, idx) => (
					<SidebarItem key={idx} {...item} />
				))}
			</ul>
		</aside>
	)
}

export default Sidebar
