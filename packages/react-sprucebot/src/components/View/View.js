// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import Sidebar from '../Core/components/Sidebar/Sidebar'

type Props = {
	sidebarItems: Array<Object>,
	user: Object,
	business: Object
}
type State = {
	sidebarIsVisible: boolean
}

export default class View extends Component<Props, State> {
	state = {
		sidebarIsVisible: false
	}

	toggleSidebarVisibility = () => {
		this.setState(prevState => ({
			sidebarIsVisible: !prevState.sidebarIsVisible
		}))
	}

	forceCloseSidebar = () => {
		this.setState({
			sidebarIsVisible: false
		})
	}

	render() {
		const { sidebarIsVisible } = this.state
		const { sidebarItems, user, business } = this.props
		return (
			<div
				className={cx('l-page-wrapper', {
					'menu--is-visible': sidebarIsVisible
				})}
			>
				<Sidebar
					items={sidebarItems}
					sidebarIsVisible={sidebarIsVisible}
					forceCloseSidebar={this.forceCloseSidebar}
				/>
				<HeaderPrimary
					user={user}
					business={business}
					toggleSidebarVisibility={this.toggleSidebarVisibility}
					sidebarIsVisible={sidebarIsVisible}
				/>
			</div>
		)
	}
}
