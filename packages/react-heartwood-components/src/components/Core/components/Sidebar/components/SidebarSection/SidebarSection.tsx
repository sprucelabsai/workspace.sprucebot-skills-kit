import { IHWSidebarSection, IHWSidebarSpacing } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { ReactNode } from 'react'
import {
	ILayoutBuilderProps,
	LayoutBuilder
} from '../../../../../LayoutBuilder/LayoutBuilder'

interface ISidebarSectionProps extends IHWSidebarSection {
	/** Children to show in the sidebar section */
	children?: ReactNode
}

const SidebarSection = (props: ISidebarSectionProps) => {
	const {
		children,
		className,
		isCentered,
		isOnlyForMobile,
		horizontalSpacing,
		verticalSpacing,
		layoutBuilder
	} = props
	return (
		<div
			className={cx('sidebar-section', className, {
				'sidebar-section--show-only-on-mobile': isOnlyForMobile,
				'sidebar-section--centered': isCentered,
				'sidebar-section--horizontal-loose':
					horizontalSpacing === IHWSidebarSpacing.Loose,
				'sidebar-section--vertical-loose':
					verticalSpacing === IHWSidebarSpacing.Loose
			})}
		>
			{children}
			{layoutBuilder && (
				// Note: We have to cast this since ILayoutBuilderProps
				// enforces typematching. All that interface is, is a stricter
				// version of IHWLayoutBuilder.
				<LayoutBuilder {...layoutBuilder as ILayoutBuilderProps} />
			)}
		</div>
	)
}

SidebarSection.defaultProps = {
	className: '',
	isCentered: false,
	spacing: IHWSidebarSpacing.Base
}

export default SidebarSection
