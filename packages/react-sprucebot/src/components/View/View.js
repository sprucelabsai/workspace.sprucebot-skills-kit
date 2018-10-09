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
	forceShowSidebar: boolean
}

export default class View extends Component<Props, State> {
	state = {
		forceShowSidebar: false
	}

	toggleSidebarVisibility = () => {
		this.setState(prevState => ({
			forceShowSidebar: !prevState.forceShowSidebar
		}))
	}

	render() {
		const { forceShowSidebar } = this.state
		const { sidebarItems, user, business } = this.props
		return (
			<div className={cx({ 'menu--is-visible': forceShowSidebar })}>
				<Sidebar items={sidebarItems} />
				<HeaderPrimary
					user={user}
					business={business}
					toggleSidebarVisibility={this.toggleSidebarVisibility}
					sidebarIsVisible={forceShowSidebar}
				/>
			</div>
		)
	}
}
