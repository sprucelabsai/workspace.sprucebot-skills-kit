// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import type { Props as ContextMenuProps } from '../ContextMenu/ContextMenu'

// Card
type CardProps = {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: Node,

	/** Set true to make all content center aligned. */
	isCentered?: boolean,

	/** Set true if this card is mission-critical for the person who sees it. */
	isCritical?: boolean,

	/** Set true to render a smaller card variation */
	isSmall?: boolean,

	/** Optional classname */
	className?: string
}

export const Card = (props: CardProps) => {
	const { children, isCentered, isCritical, isSmall, className } = props
	return (
		<div
			className={cx('card', className, {
				'card--centered': isCentered,
				'card--critical': isCritical,
				'card--small': isSmall
			})}
		>
			{children}
		</div>
	)
}

Card.defaultProps = {
	isCentered: false
}

export default Card