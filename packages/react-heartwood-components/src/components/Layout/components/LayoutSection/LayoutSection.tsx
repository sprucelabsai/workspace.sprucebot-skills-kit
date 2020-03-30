import React from 'react'
import cx from 'classnames'

export type LayoutSectionProps = {
	/** Contents of the Layout Section */
	children: React.ReactElement

	/** Class name for the section */
	className?: string

	/** Whether this is a secondary Layout Section */
	isSecondary: boolean
}

const LayoutSection = (props: LayoutSectionProps) => {
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
