import React from 'react'
import { useMenus } from 'docz'

import Menu from './Menu'

const Sidebar = () => {
	const menus = useMenus()
	return (
		<aside className="sidebar sidebar--left">
			<ul className="sidebar__items">
				{menus.map(menu => {
					if (menu.menu) {
						return <Menu key={menu.id} name={menu.name} menu={menu.menu} />
					}
					if (menu.route) {
						return (
							<li className="sidebar__item" key={menu.id}>
								<a className="sidebar-item__link" href={menu.route}>
									{menu.name}
								</a>
							</li>
						)
					}
					return null
				})}
			</ul>
		</aside>
	)
}

export default Sidebar
