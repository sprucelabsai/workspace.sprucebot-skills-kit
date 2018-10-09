// @flow
import React, { Component, Fragment } from 'react'
import Hamburger from './components/Hamburger/Hamburger'
import DefaultLockup from './components/DefaultLockup/DefaultLockup'
import UserMenu from './components/UserMenu/UserMenu'
import { Search } from '../../../Forms'
import Button from '../../../Button/Button'

type State = {
	isMenuVisible: boolean
}
type Props = {
	user: Object,
	business: Object
}

export default class HeaderPrimary extends Component<Props, State> {
	state = {
		isMenuVisible: false
	}

	toggleMenuVisibility = () => {
		this.setState(prevState => ({
			isMenuVisible: !prevState.isMenuVisible
		}))
	}

	render() {
		const { isMenuVisible } = this.state
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
							<UserMenu {...user} />
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
