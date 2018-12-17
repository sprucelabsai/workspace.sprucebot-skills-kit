// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import Sidebar from '../Core/components/Sidebar/Sidebar'

type Props = {
	sidebarItems?: Array<Object>,
	user: Object,
	business: Object,
	getSearchSuggestionValue?: Function,
	renderSearchSuggestion?: Function,
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
		const {
			sidebarItems,
			user,
			business,
			getSearchSuggestionValue,
			renderSearchSuggestion,
			children
		} = this.props

		return (
			<div
				className={cx('main-wrapper', {
					'menu--is-visible': sidebarIsVisible,
					'sidebar--is-collapsed': !sidebarIsExpanded,
					'sidebar--is-missing': !sidebarItems || sidebarItems.length === 0
				})}
			>
				{sidebarItems && sidebarItems.length > 0 && (
					<Sidebar
						items={sidebarItems}
						sidebarIsVisible={sidebarIsVisible}
						isExpanded={sidebarIsExpanded}
						toggleExpanded={this.toggleSidebarExpanded}
						forceCloseSidebar={this.forceCloseSidebar}
					/>
				)}
				<HeaderPrimary
					user={user}
					business={business}
					enableHamburgerMenu={
						sidebarItems && sidebarItems.length > 0 ? true : false
					}
					toggleSidebarVisibility={this.toggleSidebarVisibility}
					sidebarIsVisible={sidebarIsVisible}
					getSearchSuggestionValue={getSearchSuggestionValue}
					renderSearchSuggestion={renderSearchSuggestion}
				/>
				<main className="main-content">{children}</main>
			</div>
		)
	}
}
