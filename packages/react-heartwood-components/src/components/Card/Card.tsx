import React, { Component } from 'react'
import cx from 'classnames'
import CardHeader, { ICardHeaderProps } from './components/CardHeader'
import CardBody from './components/CardBody'
import CardSection from './components/CardSection'
import CardFooter from './components/CardFooter'

export interface ICardProps {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children?: React.ReactNode

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

	/** Optional; makes the card expandable */
	expandable?: boolean

	/** Optional; for expandable cards, sets the default expanded state */
	defaultExpanded?: boolean

	/** Optional; render the card header */
	headerProps?: ICardHeaderProps
}

interface ICardDefaultProps {
	isCentered: boolean
	expandable: boolean
	defaultExpanded: boolean
}

interface ICardState {
	/** Is the card expanded? */
	isExpanded: boolean
}

export default class Card extends Component<ICardProps, ICardState> {
	public static Header = CardHeader
	public static Body = CardBody
	public static Section = CardSection
	public static Footer = CardFooter

	public static defaultProps = {
		isCentered: false,
		expandable: false,
		defaultExpanded: true
	}

	// TODO: TS/React should be inferring this, but it isn't.
	// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
	public constructor(props: ICardProps & ICardDefaultProps) {
		super(props)

		this.state = {
			isExpanded: props.defaultExpanded
		}
	}

	public toggleExpanded = () => {
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded
		}))
	}

	public render(): React.ReactElement {
		const {
			children,
			isCentered,
			isCritical,
			isSmall,
			isFullSize,
			className,
			expandable,
			headerProps
		} = this.props

		const { isExpanded } = this.state
		return (
			<div
				className={cx('card', className, {
					'card--centered': isCentered,
					'card--critical': isCritical,
					'card--small': isSmall,
					'card--full-size': isFullSize,
					'card--is-collapsed': expandable && !isExpanded
				})}
			>
				{expandable && (
					<CardHeader
						{...headerProps}
						actions={[
							{
								icon: {
									name: isExpanded
										? 'keyboard_arrow_down'
										: 'keyboard_arrow_right'
								},
								onClick: () => this.toggleExpanded()
							}
						]}
					/>
				)}
				{isExpanded && children}
			</div>
		)
	}
}
