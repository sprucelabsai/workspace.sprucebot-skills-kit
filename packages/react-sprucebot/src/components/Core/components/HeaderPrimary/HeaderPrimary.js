// @flow
import React, { Component, Fragment } from 'react'
import Hamburger from './components/Hamburger/Hamburger'
import DefaultLockup from './components/DefaultLockup/DefaultLockup'
import UserMenu from './components/UserMenu/UserMenu'
import { Search } from '../../../Forms'
import Button from '../../../Button/Button'

type State = {
	isMenuVisible: boolean,
	isUserMenuVisible: boolean
}
type Props = {
	user: Object,
	business: Object
}

export default class HeaderPrimary extends Component<Props, State> {
	state = {
		isMenuVisible: false,
		isUserMenuVisible: false
	}

	toggleMenuVisibility = () => {
		this.setState(prevState => ({
			isMenuVisible: !prevState.isMenuVisible
		}))
	}

	toggleUserMenuVisibility = () => {
		this.setState(prevState => ({
			isUserMenuVisible: !prevState.isUserMenuVisible
		}))
	}

	render() {
		const { isMenuVisible, isUserMenuVisible } = this.state
		const { user, business } = this.props
		return (
			<header className="header-primary">
				<div className="header-primary__left">
					<Hamburger
						onClick={this.toggleMenuVisibility}
						isMenuVisible={isMenuVisible}
					/>
					{business ? (
						<div>
							<p className="header-primary__text">{business.name}</p>
							{business.address && (
								<p className="header-primary__text header-primary__address">
									<a href="#">{business.address}</a>
								</p>
							)}
						</div>
					) : (
						<DefaultLockup />
					)}
				</div>
				<div className="header-primary__right">
					{user ? (
						<Fragment>
							<Search
								className="text-input-small"
								placeholder="Search anything…"
							/>
							<UserMenu
								menuIsVisible={isUserMenuVisible}
								toggleMenu={this.toggleUserMenuVisibility}
								{...user}
							/>
						</Fragment>
					) : (
						<Fragment>
							<Button kind="primary" isSmall text="Log In" />
							<Button isSmall text="Sign Up" />
						</Fragment>
					)}
				</div>
			</header>
		)
	}
}
