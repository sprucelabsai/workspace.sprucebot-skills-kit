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
	isUserMenuVisible: boolean
}
type Props = {
	/** The logged-in user */
	user?: Object,

	/** The current business */
	business?: Object,

	/** Handler to set sidebar visibility to true or false */
	toggleSidebarVisibility: Function,

	/** Set true to show the sidebar (small screens only) */
	isSidebarVisible: boolean,

	/** Passthrough function to calculate suggestions */
	getSearchSuggestions?: Function,

	/** Passthrough function to show search suggestion value */
	getSearchSuggestionValue?: Function,

	/** Passthrough function to render search suggestions */
	renderSearchSuggestion?: Function,

	/** Passthrough called every time suggestion is selected */
	onSearchSuggestionSelected?: Function,

	/** Whether or not we will need to handle hamburger functionality */
	enableHamburgerMenu: boolean,

	searchPlaceholder?: string
}

export default class HeaderPrimary extends Component<Props, State> {
	static defaultProps = {
		enableHamburgerMenu: true,
		searchPlaceholder: 'Search anything…'
	}

	state = {
		isMenuExpanded: false,
		isUserMenuVisible: false
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

	setUserMenuVisibility = () => {
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
			isSidebarVisible,
			getSearchSuggestions,
			getSearchSuggestionValue,
			onSearchSuggestionSelected,
			renderSearchSuggestion,
			enableHamburgerMenu,
			searchPlaceholder
		} = this.props

		return (
			<header
				className={cx('header-primary', {
					'hamburger-enabled': enableHamburgerMenu
				})}
				ref={ref => (this.ref = ref)}
			>
				<div className="header-primary__left">
					{enableHamburgerMenu && (
						<Hamburger
							onClick={toggleSidebarVisibility}
							isSidebarVisible={isSidebarVisible}
						/>
					)}
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
								setMenu={this.setUserMenuVisibility}
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
