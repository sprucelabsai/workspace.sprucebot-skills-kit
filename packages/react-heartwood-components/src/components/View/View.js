// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import { Sidebar, SidebarFooter } from '../Core'

type Props = {
	sidebarItems?: Array<Object>,
	user: Object,
	business: Object,
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
		onSearchSuggestionSelected,
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
					footer={<SidebarFooter />}
					isSidebarVisible={isSidebarVisible}
					isExpanded={isSidebarExpanded}
					toggleExpanded={toggleSidebarExpanded}
					forceCloseSidebar={forceCloseSidebar}
					side="left"
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
				onSearchSuggestionSelected={onSearchSuggestionSelected}
				searchPlaceholder={searchPlaceholder}
			/>
			<main className="main-content">{children}</main>
		</div>
	)
}

export default View
