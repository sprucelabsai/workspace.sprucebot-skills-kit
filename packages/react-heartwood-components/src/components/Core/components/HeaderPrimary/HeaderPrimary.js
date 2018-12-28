// @flow
// TODO: The Autosuggest used here will need to be updated to hook up to the API
// and render userful results. This should probably be done as its own component
import React, { Component, Fragment } from 'react'
import Hamburger from './components/Hamburger/Hamburger'
import DefaultLockup from './components/DefaultLockup/DefaultLockup'
import UserMenu from './components/UserMenu/UserMenu'
import { Autosuggest } from '../../../Forms'
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

	/** The current location */
	location?: Object,

	/** Handler to set sidebar visibility to true or false */
	toggleSidebarVisibility: Function,

	/** Set true to show the sidebar (small screens only) */
	isSidebarVisible: boolean,

	/** Passthrough function to calculate search suggestions */
	getSearchSuggestions?: Function,

	/** Passthrough function to show search suggestion value */
	getSearchSuggestionValue?: Function,

	/** Passthrough function to render search suggestions */
	renderSearchSuggestion?: Function,

	/** Passthrough called every time suggestion is selected */
	onSearchSuggestionSelected?: Function,

	/** Whether or not we will need to handle hamburger functionality */
	enableHamburgerMenu: boolean,

	/** Placeholder text for the search field */
	searchPlaceholder?: string,

	/** Set true to show location management shortcut */
	isLocationManagmentButtonVisible?: boolean,

	/** Set true to show skill management shortcut */
	isSkillManagementButtonVisible: boolean
}

export default class HeaderPrimary extends Component<Props, State> {
	static defaultProps = {
		enableHamburgerMenu: true,
		searchPlaceholder: 'Search…',
		isLocationManagmentButtonVisible: false,
		isSkillManagementButtonVisible: false
	}

	state = {
		isMenuExpanded: false,
		isUserMenuVisible: false,
		isLocationMenuVisible: false
	}

	ref: any

	hideUserMenu = (e: Event) => {
		if (e.key === 'Escape' || e.target.contains(this.ref)) {
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
			} else if (this.state.isLocationMenuVisible) {
				window.addEventListener('click', this.hideLocationMenu, false)
				window.addEventListener('keyup', this.hideLocationMenu, false)
			} else {
				window.removeEventListener('click', this.hideUserMenu, false)
				window.removeEventListener('keyup', this.hideUserMenu, false)
				window.removeEventListener('click', this.hideLocationMenu, false)
				window.removeEventListener('keyup', this.hideLocationMenu, false)
			}
		}
	}

	render() {
		const {
			isMenuExpanded,
			isUserMenuVisible,
			isLocationMenuVisible
		} = this.state

		const {
			user,
			location,
			toggleSidebarVisibility,
			isSidebarVisible,
			getSearchSuggestions,
			getSearchSuggestionValue,
			onSearchSuggestionSelected,
			renderSearchSuggestion,
			enableHamburgerMenu,
			searchPlaceholder,
			isLocationManagmentButtonVisible,
			isSkillManagementButtonVisible
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
					{location ? (
						<div className="header-primary__location">
							<p className="header-primary__text">{location.name}</p>
							{location.address && (
								<p className="header-primary__text header-primary__address">
									<a href="#">{location.address}</a>
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
							{location && isLocationManagmentButtonVisible && (
								<div className="header-primary__shortcut-btn-wrapper">
									<Button
										onClick={this.toggleLocationMenuVisibility}
										className="header-primary__shortcut-btn"
										icon={{ name: 'location' }}
										text="Location"
										isIconOnly
									/>
									{isLocationMenuVisible && <div>Hello</div>}
								</div>
							)}
							{isSkillManagementButtonVisible && (
								<div className="header-primary__shortcut-btn-wrapper">
									<Button
										className="header-primary__shortcut-btn"
										icon={{ name: 'skill' }}
										text="Skills"
										isIconOnly
									/>
								</div>
							)}
							{getSearchSuggestionValue && renderSearchSuggestion && (
								<Autosuggest
									className="text-input-small"
									placeholder={searchPlaceholder}
									isSmall
									wrapperClassName="header-primary__autosuggest"
									getSuggestions={getSearchSuggestions}
									getSuggestionValue={getSearchSuggestionValue}
									renderSuggestion={renderSearchSuggestion}
									onSuggestionSelected={onSearchSuggestionSelected}
								/>
							)}
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
