import React from 'react'
import cx from 'classnames'

export interface ICardProps {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: React.ReactNode

	/** Set true to make all content center aligned. */
	isCentered?: boolean

	/** Set true if this card is mission-critical for the person who sees it. */
	isCritical?: boolean

	/** Set true to render a smaller card variation */
	isSmall?: boolean

	/** Set true to fill space of parent */
	isFullSize?: boolean

	/** Optional classname */
	className?: string
}

export const Card = (props: ICardProps): React.ReactElement => {
	const {
		children,
		isCentered,
		isCritical,
		isSmall,
		isFullSize,
		className
	} = props
	return (
		<div
			className={cx('card', className, {
				'card--centered': isCentered,
				'card--critical': isCritical,
				'card--small': isSmall,
				'card--full-size': isFullSize
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
