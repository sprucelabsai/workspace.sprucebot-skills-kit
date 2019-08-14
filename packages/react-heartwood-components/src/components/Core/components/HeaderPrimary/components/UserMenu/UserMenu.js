// @flow
import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import Avatar from '../../../../../Avatar/Avatar'

type Props = {
	/** User image to show in the avatar */
	image: string,

	/** User name */
	name: string,

	/** Set true to show the menu */
	menuIsVisible: boolean,

	/** Handler to toggle menu visibility */
	toggleMenu: Function,

	/** Menu children (<ListItem> or <li>) */
	userMenuItems: ReactNode
}

const UserMenu = (props: Props) => {
	const { image, name, menuIsVisible, toggleMenu, userMenuItems } = props

	return (
		<div className="user-menu">
			<button className="btn header-primary__user-btn" onClick={toggleMenu}>
				<span className="btn__inner">
					<Avatar image={image} alt={name} width={32} height={32} />
				</span>
			</button>
			<VelocityTransitionGroup
				enter={{
					animation: { opacity: 1, translateY: '4px' },
					duration: 200
				}}
				leave={{
					animation: { opacity: 0, translateY: '8px' },
					duration: 0
				}}
			>
				{menuIsVisible && (
					<ul className="user-menu__menu list card">{userMenuItems}</ul>
				)}
			</VelocityTransitionGroup>
		</div>
	)
}

export default UserMenu
