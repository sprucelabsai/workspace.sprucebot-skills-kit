// @flow
import React from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import { Sidebar, SidebarFooter } from '../Core'
import type { Node } from 'react'

type Props = {
	sidebarItems?: Array<Object>,
	sidebarBackLink?: Object,
	user: Object,
	organization: Object,
	location: Object,
	getSearchSuggestions?: Function,
	getSearchSuggestionValue?: Function,
	renderSearchSuggestion?: Function,
	onSearchSuggestionSelected?: Function,
	children: Node,
	toggleSidebarVisibility: Function,
	toggleSidebarExpanded: Function,
	forceCloseSidebar: Function,
	isSidebarVisible?: boolean,
	isSidebarExpanded?: boolean,
	isSidebarMobileExpanded?: boolean,
	searchPlaceholder?: string
}

const View = (props: Props) => {
	const {
		sidebarItems,
		sidebarBackLink,
		user,
		organization,
		location,
		getSearchSuggestions,
		getSearchSuggestionValue,
		renderSearchSuggestion,
		onSearchSuggestionSelected,
		isSidebarVisible,
		isSidebarExpanded,
		isSidebarMobileExpanded,
		toggleSidebarExpanded,
		toggleSidebarVisibility,
		forceCloseSidebar,
		searchPlaceholder,
		children
	} = props

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
					backLink={sidebarBackLink}
					footer={<SidebarFooter />}
					isSidebarVisible={isSidebarVisible}
					isExpanded={isSidebarExpanded}
					isMobileExpanded={isSidebarMobileExpanded}
					toggleExpanded={toggleSidebarExpanded}
					forceCloseSidebar={forceCloseSidebar}
					side="left"
				/>
			)}
			<HeaderPrimary
				user={user}
				organization={organization}
				location={location}
				enableHamburgerMenu={
					sidebarItems && sidebarItems.length > 0 ? true : false
				}
				toggleSidebarVisibility={toggleSidebarVisibility}
				isSidebarVisible={isSidebarMobileExpanded}
				getSearchSuggestions={getSearchSuggestions}
				getSearchSuggestionValue={getSearchSuggestionValue}
				renderSearchSuggestion={renderSearchSuggestion}
				onSearchSuggestionSelected={onSearchSuggestionSelected}
				searchPlaceholder={searchPlaceholder}
			/>
			<main className="main-content">{children}</main>
		</div>
	)
}

export default View
