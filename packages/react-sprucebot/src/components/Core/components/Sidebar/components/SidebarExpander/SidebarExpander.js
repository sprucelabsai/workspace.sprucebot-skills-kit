// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import ExpandIcon2 from '../../../../../../../static/assets/icons/ic_keyboard_arrow_right.svg'
import CollapseIcon2 from '../../../../../../../static/assets/icons/ic_keyboard_arrow_left.svg'

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
				icon={isExpanded ? <CollapseIcon2 /> : <ExpandIcon2 />}
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
