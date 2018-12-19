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
	getSearchSuggestionValue?: Function,
	renderSearchSuggestion?: Function,
	children: Node,
	setSidebarVisibility: Function,
	setSidebarExpanded: Function,
	forceCloseSidebar: Function,
	isSidebarVisible?: boolean,
	isSidebarExpanded?: boolean
}

const View = (props: Props) => {
	const {
		sidebarItems,
		user,
		business,
		getSearchSuggestionValue,
		renderSearchSuggestion,
		isSidebarVisible,
		isSidebarExpanded,
		setSidebarExpanded,
		setSidebarVisibility,
		forceCloseSidebar,
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
					setExpanded={setSidebarExpanded}
					forceCloseSidebar={forceCloseSidebar}
				/>
			)}
			<HeaderPrimary
				user={user}
				business={business}
				enableHamburgerMenu={
					sidebarItems && sidebarItems.length > 0 ? true : false
				}
				setSidebarVisibility={setSidebarVisibility}
				isSidebarVisible={isSidebarVisible}
				getSearchSuggestionValue={getSearchSuggestionValue}
				renderSearchSuggestion={renderSearchSuggestion}
			/>
			<main className="main-content">{children}</main>
		</div>
	)
}

export default View
