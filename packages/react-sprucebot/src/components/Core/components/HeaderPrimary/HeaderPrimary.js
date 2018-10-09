// @flow
import React, { Component, Fragment } from 'react'
import Hamburger from './components/Hamburger/Hamburger'
import DefaultLockup from './components/DefaultLockup/DefaultLockup'
import UserMenu from './components/UserMenu/UserMenu'
import { Search } from '../../../Forms'
import Button from '../../../Button/Button'

type State = {
	isMenuExpanded: boolean,
	isUserMenuVisible: boolean
}
type Props = {
	user: Object,
	business: Object,
	toggleSidebarVisibility: Function,
	sidebarIsVisble: boolean
}

export default class HeaderPrimary extends Component<Props, State> {
	state = {
		isMenuExpanded: false,
		isUserMenuVisible: false
	}

	ref: any

	hideUserMenu = (e: any) => {
		if (e.key === 'Escape' || e.target.contains(this.ref)) {
			this.setState(
				{
					isUserMenuVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	toggleUserMenuVisibility = () => {
		this.setState(
			prevState => ({
				isUserMenuVisible: !prevState.isUserMenuVisible
			}),
			() => this.manageListeners()
		)
	}

	manageListeners = () => {
		if (typeof window !== 'undefined') {
			if (this.state.isUserMenuVisible) {
				window.addEventListener('click', this.hideUserMenu, false)
				window.addEventListener('keyup', this.hideUserMenu, false)
			} else {
				window.removeEventListener('click', this.hideUserMenu, false)
				window.removeEventListener('keyup', this.hideUserMenu, false)
			}
		}
	}

	render() {
		const { isMenuExpanded, isUserMenuVisible } = this.state
		const {
			user,
			business,
			toggleSidebarVisibility,
			sidebarIsVisible
		} = this.props
		return (
			<header className="header-primary" ref={ref => (this.ref = ref)}>
				<div className="header-primary__left">
					<Hamburger
						onClick={toggleSidebarVisibility}
						isSidebarVisible={sidebarIsVisible}
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
