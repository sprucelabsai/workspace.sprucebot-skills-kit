// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import Sidebar from '../Core/components/Sidebar/Sidebar'

type Props = {
	sidebarItems: Array<Object>,
	user: Object,
	business: Object,
	children: Node
}
type State = {
	sidebarIsVisible: boolean,
	sidebarIsExpanded: boolean
}

export default class View extends Component<Props, State> {
	state = {
		sidebarIsVisible: false,
		sidebarIsExpanded: true
	}

	toggleSidebarVisibility = () => {
		this.setState(prevState => ({
			sidebarIsVisible: !prevState.sidebarIsVisible,
			sidebarIsExpanded: true
		}))
	}

	toggleSidebarExpanded = () => {
		this.setState(prevState => ({
			sidebarIsExpanded: !prevState.sidebarIsExpanded
		}))
	}

	forceCloseSidebar = () => {
		this.setState({
			sidebarIsVisible: false
		})
	}

	render() {
		const { sidebarIsVisible, sidebarIsExpanded } = this.state
		const { sidebarItems, user, business, children } = this.props
		return (
			<div
				className={cx('l-page-wrapper', {
					'menu--is-visible': sidebarIsVisible,
					'sidebar--is-collapsed': !sidebarIsExpanded
				})}
			>
				<Sidebar
					items={sidebarItems}
					sidebarIsVisible={sidebarIsVisible}
					isExpanded={sidebarIsExpanded}
					toggleExpanded={this.toggleSidebarExpanded}
					forceCloseSidebar={this.forceCloseSidebar}
				/>
				<HeaderPrimary
					user={user}
					business={business}
					toggleSidebarVisibility={this.toggleSidebarVisibility}
					sidebarIsVisible={sidebarIsVisible}
				/>
				<main className="l-page-inner">
					<div class="l-container-medium ">{children}</div>
				</main>
			</div>
		)
	}
}
