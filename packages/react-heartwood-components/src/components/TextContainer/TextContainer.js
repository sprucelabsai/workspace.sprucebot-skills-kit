// @flow
import React from 'react'
import cx from 'classnames'

export type TextContainerProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Vertical spacing of the child components */
	spacing?: 'tight' | 'loose'
}

const TextContainer = (props: TextContainerProps) => {
	const { children, className, spacing } = props

	return (
		<div
			className={cx('text-container', className, {
				'text-container--spacing-tight': spacing === 'tight',
				'text-container--spacing-loose': spacing === 'loose'
			})}
		>
			{children}
		</div>
	)
}

export default TextContainer
