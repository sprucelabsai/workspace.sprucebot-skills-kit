import { IHWLayoutSection } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'

export interface ILayoutSectionProps extends IHWLayoutSection {
	/** Contents of the Layout Section */
	children: React.ReactElement
}

const LayoutSection = (props: ILayoutSectionProps) => {
	const { className, isSecondary, children, ...rest } = props

	return (
		<div
			className={cx('layout__section', className, {
				'layout__section--secondary': isSecondary
			})}
			{...rest}
		>
			{children}
		</div>
	)
}

LayoutSection.displayName = 'Layout.Section'
LayoutSection.defaultProps = {
	isSecondary: false
}

export default LayoutSection
