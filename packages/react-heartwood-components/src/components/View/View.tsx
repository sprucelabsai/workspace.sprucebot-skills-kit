import React, { ReactNode, ReactElement } from 'react'
import cx from 'classnames'
import HeaderPrimary from '../Core/components/HeaderPrimary/HeaderPrimary'
import { Sidebar, SidebarFooter } from '../Core'
import moment from 'moment'

interface IViewProps {
	children: ReactNode
	forceCloseSidebar?: Function

	/** Should view chrome be shown? (Header, left sidebar) */
	isChromeless?: boolean

	isSidebarExpanded?: boolean
	isSidebarMobileExpanded?: boolean
	isSidebarVisible?: boolean
	location?: Record<string, any>
	onClickSearch?: Function
	organization?: Record<string, any>
	privacyLink?: string
	searchPlaceholder?: string
	sidebarBackLink?: Record<string, any>
	sidebarItems?: Record<string, any>[]
	termsLink?: string
	toggleSidebarExpanded?: Function
	toggleSidebarVisibility?: Function
	user?: Record<string, any>

	/** Menu children (<ListItem> or <li>) */
	userMenuItems: ReactNode
}

const View = (props: IViewProps): ReactElement => {
	const {
		children,
		forceCloseSidebar,
		isChromeless,
		isSidebarExpanded,
		isSidebarMobileExpanded,
		isSidebarVisible,
		location,
		onClickSearch,
		organization,
		privacyLink,
		searchPlaceholder,
		sidebarBackLink,
		sidebarItems,
		termsLink,
		toggleSidebarExpanded,
		toggleSidebarVisibility,
		user,
		userMenuItems
	} = props

	return (
		<div
			className={cx('main-wrapper', {
				'menu--is-visible': isSidebarVisible,
				'sidebar--is-collapsed': !isSidebarExpanded,
				'sidebar--is-missing': !sidebarItems || sidebarItems.length === 0
			})}
		>
			{!isChromeless && (
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
			)}

			<div className="main-content-outer">
				{!isChromeless && sidebarItems && sidebarItems.length > 0 && (
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

			{!isChromeless && (!sidebarItems || sidebarItems.length === 0) && (
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
