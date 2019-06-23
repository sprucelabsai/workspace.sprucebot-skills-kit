import React, { Fragment } from 'react'

const Menu = props => {
	const { menu, name } = props

	return (
		<Fragment>
			<p>{name}</p>
			{menu.map(item => (
				<li className="sidebar__item" key={item.id}>
					<a href={item.route} className="sidebar-item__link">
						{item.name}
					</a>
				</li>
			))}
		</Fragment>
	)
}

export default Menu
