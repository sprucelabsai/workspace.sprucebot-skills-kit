// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import ToggleCollapseIcon from '../../../../../../../static/assets/icons/ic_keyboard_arrow_right.svg'

type Props = {
	/** Set true to expand the sidebar */
	isExpanded: boolean,

	/** Handler to toggle sidebar visibility (large screens only) */
	toggleExpanded: Function,

	/** Handler to force the sidebar closed */
	forceCloseSidebar: Function
}

const SidebarExpander = (props: Props) => {
	const { isExpanded, toggleExpanded, forceCloseSidebar } = props
	return (
		<div className="sidebar-collapse">
			<Button
				icon={{
					customIcon: ToggleCollapseIcon
				}}
				onClick={() => {
					toggleExpanded()
					forceCloseSidebar()
				}}
				isSmall
			/>
		</div>
	)
}

export default SidebarExpander
