// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import Sidebar from '../Core/components/Sidebar/Sidebar'

type Props = {
	sidebarItems?: Array<Object>,
	user: Object,
	business: Object,
	getSearchSuggestions?: Function,
	getSearchSuggestionValue?: Function,
	renderSearchSuggestion?: Function,
	children: Node,
	toggleSidebarVisibility: Function,
	toggleSidebarExpanded: Function,
	forceCloseSidebar: Function,
	isSidebarVisible?: boolean,
	isSidebarExpanded?: boolean,
	searchPlaceholder?: string
}

const View = (props: Props) => {
	const {
		sidebarItems,
		user,
		business,
		getSearchSuggestions,
		getSearchSuggestionValue,
		renderSearchSuggestion,
		isSidebarVisible,
		isSidebarExpanded,
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
					isSidebarVisible={isSidebarVisible}
					isExpanded={isSidebarExpanded}
					toggleExpanded={toggleSidebarExpanded}
					forceCloseSidebar={forceCloseSidebar}
				/>
			)}
			<HeaderPrimary
				user={user}
				business={business}
				enableHamburgerMenu={
					sidebarItems && sidebarItems.length > 0 ? true : false
				}
				toggleSidebarVisibility={toggleSidebarVisibility}
				isSidebarVisible={isSidebarVisible}
				getSearchSuggestions={getSearchSuggestions}
				getSearchSuggestionValue={getSearchSuggestionValue}
				renderSearchSuggestion={renderSearchSuggestion}
				searchPlaceholder={searchPlaceholder}
			/>
			<main className="main-content">{children}</main>
		</div>
	)
}

export default View
