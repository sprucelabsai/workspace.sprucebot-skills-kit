import React, { ReactNode, ReactElement } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import { Sidebar, SidebarFooter } from '../Core'
import moment from 'moment'

interface IViewProps {
	sidebarItems?: Record<string, any>[]
	sidebarBackLink?: Record<string, any>
	user?: Record<string, any>
	organization?: Record<string, any>
	location?: Record<string, any>
	children: ReactNode
	toggleSidebarVisibility?: Function
	toggleSidebarExpanded?: Function
	forceCloseSidebar?: Function
	isSidebarVisible?: boolean
	isSidebarExpanded?: boolean
	isSidebarMobileExpanded?: boolean
	isFooterVisible: boolean
	onClickSearch?: Function
	searchPlaceholder?: string
	privacyLink
	termsLink

	/** Menu children (<ListItem> or <li>) */
	userMenuItems: ReactNode
}

const View = (props: IViewProps): ReactElement => {
	const {
		sidebarItems,
		sidebarBackLink,
		user,
		organization,
		location,
		isSidebarVisible,
		isSidebarExpanded,
		isSidebarMobileExpanded,
		isFooterVisible,
		toggleSidebarExpanded,
		toggleSidebarVisibility,
		forceCloseSidebar,
		onClickSearch,
		searchPlaceholder,
		userMenuItems,
		children,
		privacyLink,
		termsLink
	} = props

	return (
		<div
			className={cx('main-wrapper', {
				'menu--is-visible': isSidebarVisible,
				'sidebar--is-collapsed': !isSidebarExpanded,
				'sidebar--is-missing': !sidebarItems || sidebarItems.length === 0
			})}
		>
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
				userMenuItems={userMenuItems}
			/>

			<div className="main-content-outer">
				{sidebarItems && sidebarItems.length > 0 && (
					<div className="main-content__sidebar">
						<Sidebar
							style={{ zIndex: 1 }}
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
					</div>
				)}

				<main className="main-content">{children}</main>
			</div>

			{isFooterVisible && (
				<footer className="footer">
					<p className="footer-text">
						{termsLink && (
							<a href={termsLink} className="footer-link">
								Terms of Service
							</a>
						)}
						{privacyLink && (
							<a href={privacyLink} className="footer-link">
								Privacy Policy
							</a>
						)}
					</p>
					<p className="footer-text">
						{`© Spruce Labs ${moment().format('YYYY')}`}
					</p>
				</footer>
			)}
		</div>
	)
}

export default View
