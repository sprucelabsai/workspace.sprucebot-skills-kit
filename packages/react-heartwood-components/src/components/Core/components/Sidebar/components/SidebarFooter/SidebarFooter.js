// @flow
import React from 'react'
import { HelpButton, Legal } from '../../../FooterPrimary'

const SidebarFooter = () => (
	<div className="sidebar__footer">
		<div className="sidebar-item">
			<div className="sidebar-item__inner">
				<HelpButton
					className="sidebar-item__link"
					iconClassName="sidebar-item__icon sidebar-item__line-icon"
					textClassName="sidebar-item__text"
				/>
			</div>
		</div>
		<Legal
			className="sidebar__footer-text"
			linkClassName="sidebar__footer-link"
		/>
	</div>
)

export default SidebarFooter
