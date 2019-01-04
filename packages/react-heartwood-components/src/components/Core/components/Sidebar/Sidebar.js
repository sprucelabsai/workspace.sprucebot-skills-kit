// @flow
import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import SidebarExpander from './components/SidebarExpander/SidebarExpander'
import SidebarItem from './components/SidebarItem/SidebarItem'
import SidebarSection from './components/SidebarSection/SidebarSection'
import type { Props as ItemProps } from './components/SidebarItem/SidebarItem'
import SidebarFooter from './components/SidebarFooter/SidebarFooter'
import Button from '../../../Button/Button'
import type { Props as ButtonProps } from '../../../Button/Button'
import Text from '../../../Text/Text'

type SidebarHeader = {
	title: string,
	action: ButtonProps
}

type Props = {
	/** Optional header that will only appear on mobile */
	mobileHeader?: SidebarHeader,

	/** Items to display in the sidebar */
	items?: Array<ItemProps>,

	/** Children to add to the sidebar */
	children?: Node,

	/** Include a footer in the sidebar */
	footer?: Node,

	/** Set which side the sidebar is on. Must be either 'left' or 'right */
	side: 'left' | 'right',

	/** Set true to make the sidebar larger. Defaults to false. */
	isLarge?: boolean,

	/** Enables the user to collapse the sidebar on desktop. Defaults to true. */
	isCollapsible?: boolean,

	/** Set true to expand the sidebar (large screens only) */
	isExpanded: boolean,

	/** Set true to expand the sidebar on small screens */
	isMobileExpanded?: boolean,

	/** Handler to force the sidebar to collapse */
	forceCloseSidebar: Function,

	/** Handler to toggle the visibility of the sidebar */
	toggleExpanded: Function
}

const Sidebar = (props: Props) => {
	const {
		items,
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
				'sidebar--left': side === 'left',
				'sidebar--right': side === 'right',
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
					<SidebarSection>
						<ul className="sidebar__items">
							{items.map((item, idx) => (
								<SidebarItem key={idx} {...item} />
							))}
						</ul>
					</SidebarSection>
				)}
				<div className="sidebar__content">{children && children}</div>
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
	isLarge: false,
	isCollapsible: true,
	items: [],
	children: null,
	footer: null,
	isMobileExpanded: false,
	mobileHeader: null
}

export default Sidebar
