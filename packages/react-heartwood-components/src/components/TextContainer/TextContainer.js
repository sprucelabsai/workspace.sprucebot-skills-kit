// @flow
import React from 'react'
import cx from 'classnames'

import type { Node } from 'react'

export type TextContainerProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Vertical spacing of the child components */
	spacing?: 'tight' | 'loose',

	/** Whether the children of the text container are centered */
	isCentered?: boolean
}

const TextContainer = (props: TextContainerProps) => {
	const { children, className, spacing, isCentered } = props

	return (
		<div
			className={cx('text-container', className, {
				'text-container--centered': isCentered,
				'text-container--spacing-tight': spacing === 'tight',
				'text-container--spacing-loose': spacing === 'loose'
			})}
		>
			{children}
		</div>
	)
}

TextContainer.defaultProps = {
	isCentered: false
}

export default TextContainer
