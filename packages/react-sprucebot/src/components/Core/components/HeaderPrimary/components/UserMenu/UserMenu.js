// @flow
import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import Avatar from '../../../../../Avatar/Avatar'
import Button from '../../../../../Button/Button'
import ListItem from '../../../../../List/components/ListItem/ListItem'
import SwitchIcon from '../../../../../../../static/assets/icons/Users/Geometric-Close-Up-Single-User-Actions-Neutral/single-neutral-actions-up-down.svg'
import LogoutIcon from '../../../../../../../static/assets/icons/Interface-Essential/Login/Logout/logout.svg'

type Props = {
	image: string,
	name: string,
	menuIsVisible: boolean,
	toggleMenu: Function
}

const UserMenu = (props: Props) => {
	const { image, name, tel, menuIsVisible, toggleMenu } = props

	return (
		<div className="user-menu">
			<button className="btn header-primary__user-btn" onClick={toggleMenu}>
				<span className="btn__inner">
					<Avatar image={image} alt={name} width={32} height={32} />
				</span>
			</button>
			<VelocityTransitionGroup
				enter={{
					animation: { opacity: 1, translateY: '-2px' },
					duration: 200
				}}
				leave={{
					animation: { opacity: 0, translateY: '4px' },
					duration: 0
				}}
			>
				{menuIsVisible && (
					<ul className="user-menu__menu card">
						<ListItem avatar={image} title={name} subtitle={tel} />
						<li className="list-item">
							<Button
								kind="simple"
								text="Switch Accounts"
								icon={<SwitchIcon className="btn__line-icon" />}
							/>
						</li>
						<li className="list-item">
							<Button
								kind="simple"
								text="Log Out"
								icon={<LogoutIcon className="btn__line-icon" />}
							/>
						</li>
					</ul>
				)}
			</VelocityTransitionGroup>
		</div>
	)
}

export default UserMenu
