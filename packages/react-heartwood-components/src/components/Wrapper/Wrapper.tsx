import React from 'react'
import cx from 'classnames'

type PaddingValue =
	| 'extra-tight'
	| 'tight'
	| 'base'
	| 'loose'
	| 'extra-loose'
	| 'none'

export interface IWrapperProps {
	/** Children to wrap */
	children: React.ReactNode

	/** Base padding value will be applied to all sides */
	padding?: PaddingValue

	/** Top padding value */
	top?: PaddingValue

	/** Right padding value */
	right?: PaddingValue

	/** Bottom padding value */
	bottom?: PaddingValue

	/** Left padding value */
	left?: PaddingValue

	/** Set true for debug mode */
	debug?: boolean
}

const paddingMap = {
	'extra-tight': 'extra-tight',
	tight: 'tight',
	base: 'base',
	loose: 'loose',
	'extra-loose': 'extra-loose',
	none: '0'
}

/** Provides a padded wrapper for its children */
const Wrapper = (props: IWrapperProps): React.ReactElement => {
	const { children, padding, top, right, bottom, left, debug } = props
	const paddingClass = cx(padding && `p-${paddingMap[padding]}`)
	const topPaddingClass = cx(top && `pt-${paddingMap[top]}`)
	const rightPaddingClass = cx(right && `pr-${paddingMap[right]}`)
	const bottomPaddingClass = cx(bottom && `pb-${paddingMap[bottom]}`)
	const leftPaddingClass = cx(left && `pl-${paddingMap[left]}`)
	const debugClass = cx(debug && 'debug')
	const className = cx(
		paddingClass,
		topPaddingClass,
		rightPaddingClass,
		bottomPaddingClass,
		leftPaddingClass,
		debugClass
	)
	return (
		<div className={cx('wrapper', className)}>
			{children}
			{debug && <p>{`wrapper ${className}`}</p>}
		</div>
	)
}

Wrapper.defaultProps = {
	padding: 'base'
}

export default Wrapper
