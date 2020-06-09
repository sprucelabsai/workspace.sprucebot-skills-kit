import { IHWLayoutSection } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import {
	ILayoutBuilderProps,
	LayoutBuilder
} from '../../../LayoutBuilder/LayoutBuilder'

export interface ILayoutSectionProps extends IHWLayoutSection {
	/** Contents of the Layout Section */
	children?: React.ReactNode
}

const LayoutSection = (props: ILayoutSectionProps) => {
	const { className, isSecondary, children, layoutBuilder, ...rest } = props

	return (
		<div
			className={cx('layout__section', className, {
				'layout__section--secondary': isSecondary
			})}
			{...rest}
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

LayoutSection.displayName = 'Layout.Section'
LayoutSection.defaultProps = {
	isSecondary: false
}

export default LayoutSection
