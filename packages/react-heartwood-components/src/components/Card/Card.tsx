import React, { Component } from 'react'
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

interface ICardState {
	/** Is the card expanded? */
	isExpanded: boolean
}

export default class Card extends Component<ICardProps, ICardState> {
	public static defaultProps = {
		isCentered: false
	}

	public render(): React.ReactElement {
		const {
			children,
			isCentered,
			isCritical,
			isSmall,
			isFullSize,
			className
		} = this.props
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
}
