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
	children: Node,
	toggleSidebarVisibility?: Function,
	toggleSidebarExpanded?: Function,
	isSidebarVisible?: boolean,
	isSidebarExpanded?: boolean
}
type State = {
	isSidebarVisible: boolean,
	isSidebarExpanded: boolean
}

export default class View extends Component<Props, State> {
	static defaultProps = {
		isSidebarVisible: false,
		isSidebarExpanded: true
	}

	state = {
		isSidebarVisible: this.props.isSidebarVisible,
		isSidebarExpanded: this.props.isSidebarExpanded
	}

	toggleSidebarVisibility = () => {
		this.setState(prevState => ({
			isSidebarVisible: !prevState.isSidebarVisible,
			isSidebarExpanded: true
		}))
		this.props.toggleSidebarVisibility && this.props.toggleSidebarVisibility()
	}

	toggleSidebarExpanded = () => {
		this.setState(prevState => ({
			isSidebarExpanded: !prevState.isSidebarExpanded
		}))
		this.props.toggleSidebarExpanded && this.props.toggleSidebarExpanded()
	}

	forceCloseSidebar = () => {
		this.setState({
			isSidebarVisible: false
		})
	}

	render() {
		const { isSidebarVisible, isSidebarExpanded } = this.state
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
					'menu--is-visible': isSidebarVisible,
					'sidebar--is-collapsed': !isSidebarExpanded,
					'sidebar--is-missing': !sidebarItems || sidebarItems.length === 0
				})}
			>
				{sidebarItems && sidebarItems.length > 0 && (
					<Sidebar
						items={sidebarItems}
						isSidebarVisible={isSidebarVisible}
						isExpanded={isSidebarExpanded}
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
					isSidebarVisible={isSidebarVisible}
					getSearchSuggestionValue={getSearchSuggestionValue}
					renderSearchSuggestion={renderSearchSuggestion}
				/>
				<main className="main-content">{children}</main>
			</div>
		)
	}
}
