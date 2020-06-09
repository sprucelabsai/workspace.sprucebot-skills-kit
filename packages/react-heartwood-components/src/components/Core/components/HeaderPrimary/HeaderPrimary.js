// @flow
import React, { Component, Fragment } from 'react'
import Hamburger from './components/Hamburger/Hamburger'
import DefaultLockup from './components/DefaultLockup/DefaultLockup'
import UserMenu from './components/UserMenu/UserMenu'
import LocationMenu from './components/LocationMenu/LocationMenu'
import Button from '../../../Button/Button'
import cx from 'classnames'

type State = {
	isMenuExpanded: boolean,
	isUserMenuVisible: boolean,
	isLocationMenuVisible: boolean
}
type Props = {
	/** The logged-in user */
	user?: Object,

	/** The current organization */
	organization?: Object,

	/** The current location */
	location?: Object,

	/** Handler to set sidebar visibility to true or false */
	toggleSidebarVisibility: Function,

	/** Set true to show the sidebar (small screens only) */
	isSidebarVisible: boolean,

	/** Whether or not we will need to handle hamburger functionality */
	enableHamburgerMenu: boolean,

	/** Placeholder text for the search field */
	searchPlaceholder?: string,

	/** Handle search click */
	onClickSearch?: Function,

	/** Set true to show location management shortcut */
	isLocationManagmentButtonVisible?: boolean,

	/** Set true to show skill management shortcut */
	isSkillManagementButtonVisible: boolean,

	/** Destination for the skills link */
	skillsHref?: string,

	/** Destination for the login link */
	loginHref?: string,

	/** CTA Copy for the login link */
	loginCTA?: string,

	/** Destination for the location management link */
	locationManagementHref?: string,

	/** Menu children (<ListItem> or <li>) */
	userMenuItems: ReactNode
}

export default class HeaderPrimary extends Component<Props, State> {
	static defaultProps = {
		enableHamburgerMenu: true,
		searchPlaceholder: 'Search…',
		isLocationManagmentButtonVisible: false,
		isSkillManagementButtonVisible: false,
		skillsHref: '',
		loginHref: '/',
		loginCTA: 'Log In / Signup',
		locationManagementHref: ''
	}

	state = {
		isMenuExpanded: false,
		isUserMenuVisible: false,
		isLocationMenuVisible: false
	}

	ref: any
	userMenuRef: any

	hideUserMenu = (e: Event) => {
		if (
			e.key === 'Escape' ||
			(e.type === 'click' && !this.userMenuRef.contains(e.target)) ||
			(e.type === 'blur' && !this.userMenuRef.contains(document.activeElement))
		) {
			this.setState(
				{
					isUserMenuVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	hideLocationMenu = (e: Event) => {
		if (e.key === 'Escape' || e.target.contains(this.ref)) {
			this.setState(
				{
					isLocationMenuVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	handleSearchClick = () => {
		this.props.onClickSearch && this.props.onClickSearch()
	}

	toggleUserMenuVisibility = () => {
		this.setState(
			prevState => ({
				isUserMenuVisible: !prevState.isUserMenuVisible
			}),
			() => this.manageListeners()
		)
	}

	toggleLocationMenuVisibility = () => {
		this.setState(
			prevState => ({
				isLocationMenuVisible: !prevState.isLocationMenuVisible
			}),
			() => this.manageListeners()
		)
	}

	manageListeners = () => {
		if (typeof window !== 'undefined') {
			if (this.state.isUserMenuVisible) {
				window.addEventListener('click', this.hideUserMenu, false)
				window.addEventListener('keyup', this.hideUserMenu, false)
				window.addEventListener('blur', this.hideUserMenu, false)
			} else if (this.state.isLocationMenuVisible) {
				window.addEventListener('click', this.hideLocationMenu, false)
				window.addEventListener('keyup', this.hideLocationMenu, false)
			} else {
				window.removeEventListener('click', this.hideUserMenu, false)
				window.removeEventListener('keyup', this.hideUserMenu, false)
				window.removeEventListener('blur', this.hideUserMenu, false)
				window.removeEventListener('click', this.hideLocationMenu, false)
				window.removeEventListener('keyup', this.hideLocationMenu, false)
			}
		}
	}

	renderHeader = (organization: Object, location: Object) => {
		if (organization) {
			if (location) {
				return (
					<div className="header-primary__location">
						<p className="header-primary__text">{location.name}</p>
						{location.address && (
							<p className="header-primary__text header-primary__address">
								<a href="#">{location.address}</a>
							</p>
						)}
					</div>
				)
			} else {
				return (
					<div className="header-primary__organization">
						{organization.image && (
							<div
								className="header-primary__organization-image"
								style={{ backgroundImage: `url(${organization.image})` }}
							/>
						)}
						<p className="header-primary__text">{organization.name}</p>
					</div>
				)
			}
		} else {
			return <DefaultLockup />
		}
	}

	render() {
		const { isUserMenuVisible, isLocationMenuVisible } = this.state

		const {
			user,
			organization,
			location,
			toggleSidebarVisibility,
			isSidebarVisible,
			enableHamburgerMenu,
			searchPlaceholder,
			isLocationManagmentButtonVisible,
			isSkillManagementButtonVisible,
			userMenuItems,
			skillsHref,
			locationManagementHref,
			loginHref,
			loginCTA,
			onClickSearch
		} = this.props

		return (
			<header
				className={cx('header-primary', {
					'hamburger-enabled': enableHamburgerMenu
				})}
				ref={ref => (this.ref = ref)}
			>
				{enableHamburgerMenu && (
					<Hamburger
						onClick={toggleSidebarVisibility}
						isSidebarVisible={isSidebarVisible}
					/>
				)}
				<div className="header-primary__left">
					{this.renderHeader(organization, location)}
				</div>
				<div className="header-primary__right">
					{user ? (
						<Fragment>
							{location && isLocationManagmentButtonVisible && (
								<LocationMenu
									onClick={this.toggleLocationMenuVisibility}
									isMenuVisible={isLocationMenuVisible}
									locationManagementHref={locationManagementHref}
									locationName={location.name}
									locationAddress={location.address}
								/>
							)}
							{isSkillManagementButtonVisible && (
								<div className="header-primary__shortcut-btn-wrapper">
									<Button
										className="header-primary__shortcut-btn"
										icon={{ name: 'skill' }}
										text="Skills"
										isIconOnly
										href={skillsHref}
										target="_blank"
									/>
								</div>
							)}
							{onClickSearch && (
								<Button
									text={searchPlaceholder}
									icon={{ name: 'search' }}
									className="header-primary__search-btn"
									onClick={this.handleSearchClick}
								/>
							)}
							<UserMenu
								menuIsVisible={isUserMenuVisible}
								toggleMenu={this.toggleUserMenuVisibility}
								userMenuItems={userMenuItems}
								userMenuRef={userMenuRef => (this.userMenuRef = userMenuRef)}
								{...user}
							/>
						</Fragment>
					) : (
						<Fragment>
							<Button kind="primary" isSmall text={loginCTA} href={loginHref} />
						</Fragment>
					)}
				</div>
			</header>
		)
	}
}
