// @flow
import React from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import { Sidebar, SidebarFooter } from '../Core'
import type { Node } from 'react'

type Props = {
	sidebarItems?: Array<Object>,
	user: Object,
	organization: Object,
	location: Object,
	children: Node,
	toggleSidebarVisibility: Function,
	toggleSidebarExpanded: Function,
	forceCloseSidebar: Function,
	isSidebarVisible?: boolean,
	isSidebarExpanded?: boolean,
	isSidebarMobileExpanded?: boolean,
	onClickSearch?: Function,
	searchPlaceholder?: string
}

const View = (props: Props) => {
	const {
		sidebarItems,
		user,
		organization,
		location,
		isSidebarVisible,
		isSidebarExpanded,
		isSidebarMobileExpanded,
		toggleSidebarExpanded,
		toggleSidebarVisibility,
		forceCloseSidebar,
		onClickSearch,
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
				searchPlaceholder={searchPlaceholder}
				onClickSearch={onClickSearch}
			/>

			<main className="main-content">{children}</main>
		</div>
	)
}

export default View
