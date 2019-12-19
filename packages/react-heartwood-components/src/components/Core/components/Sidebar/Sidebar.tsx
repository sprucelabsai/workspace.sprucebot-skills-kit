import { IHWSidebar, IHWSidebarSide } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { ReactNode } from 'react'
import Button from '../../../Button/Button'
import Text from '../../../Text/Text'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem, {
	ISidebarItemProps
} from './components/SidebarItem/SidebarItem'
import SidebarSection from './components/SidebarSection/SidebarSection'

interface ISidebarProps extends IHWSidebar {
	backLink?: ISidebarItemProps | null

	/** Children to add to the sidebar */
	children?: ReactNode

	/** Include a footer in the sidebar */
	footer?: ReactNode

	/** Handler to force the sidebar to collapse */
	forceCloseSidebar?: Function

	/** Handler to toggle the visibility of the sidebar */
	toggleExpanded?: Function
}

const Sidebar = (props: ISidebarProps) => {
	const {
		items,
		sections,
		backLink,
		children,
		footer,
		forceCloseSidebar,
		toggleExpanded,
		isExpanded,
		isLarge,
		isCollapsible,
		isMobileExpanded,
		side,
		mobileHeader
	} = props

	return (
		<aside
			className={cx('sidebar', {
				'sidebar--left': side === IHWSidebarSide.Left,
				'sidebar--right': side === IHWSidebarSide.Right,
				'sidebar--large': isLarge,
				'sidebar--is-collapsed': !isExpanded,
				'sidebar--is-mobile-expanded': isMobileExpanded
			})}
		>
			{mobileHeader && (
				<SidebarSection className="sidebar-header sidebar-header--mobile">
					<Text className="sidebar-header__title">{mobileHeader.title}</Text>
					{mobileHeader.action && <Button {...mobileHeader.action} />}
				</SidebarSection>
			)}
			<div className="sidebar__inner">
				{items && items.length > 0 && (
					<ul className="sidebar__items">
						{items.map((item, idx) => (
							<SidebarItem key={idx} {...item} />
						))}
						{backLink && (
							<SidebarItem
								key="sidebar-back-link"
								className="sidebar-item__back-link"
								icon={
									backLink.icon || {
										name: 'arrow_back',
										className: 'sidebar-item__icon--fill'
									}
								}
								{...backLink}
							/>
						)}
						``
					</ul>
				)}
				<div className="sidebar__content">
					{children}
					{sections &&
						sections.map((section, idx) => (
							<SidebarSection key={`sidebar-section-${idx}`} {...section} />
						))}
				</div>
			</div>
			{footer && footer}
			{isCollapsible && (
				<SidebarExpander
					toggleExpanded={toggleExpanded}
					isExpanded={isExpanded}
					forceCloseSidebar={forceCloseSidebar}
				/>
			)}
		</aside>
	)
}

Sidebar.defaultProps = {
	isExpanded: true,
	isLarge: false,
	isCollapsible: true,
	items: [],
	children: null,
	footer: null,
	isMobileExpanded: false,
	mobileHeader: null
}

export default Sidebar
