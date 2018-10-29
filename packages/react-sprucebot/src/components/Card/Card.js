// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import type { Props as ContextMenuProps } from '../ContextMenu/ContextMenu'

// Card Header
type CardHeaderProps = {
	/** Title for the card */
	title?: string,

	/** Optional label to show above title */
	labelText?: string,

	/** Optional icon to show above the title and before the label */
	labelIcon?: any,

	/** Render buttons in the Card Header */
	actions?: Array<ButtonProps>,

	/** Renders a Context Menu in the Card Header */
	contextMenu?: Node
}

export const CardHeader = (props: CardHeaderProps) => {
	const { title, labelText, labelIcon, actions, contextMenu } = props
	return (
		<div className="card-header">
			{(title || labelText || labelIcon) && (
				<div className="card-header__text">
					{(labelText || labelIcon) && (
						<div className="card-header__label">
							{labelIcon &&
								React.cloneElement(labelIcon, {
									className: cx(
										'card-header__label-icon',
										labelIcon.props.className
									)
								})}
							{labelText && (
								<span className="card-header__label-text">{labelText}</span>
							)}
						</div>
					)}
					{title && <h3 className="card-header__title">{title}</h3>}
				</div>
			)}
			{(actions || contextMenu) && (
				<div className="card-header__actions">
					<Fragment>
						{actions &&
							actions.length > 0 &&
							actions.map(action => (
								<Button key={action.text} kind="simple" isSmall {...action} />
							))}
						{contextMenu}
					</Fragment>
				</div>
			)}
		</div>
	)
}

// Card Body
type CardBodyProps = {
	/** Children to show in the Card */
	children: Node
}

export const CardBody = (props: CardBodyProps) => {
	const { children } = props
	return <div className="card__body-inner">{children}</div>
}

CardHeader.defualtProps = {
	title: '',
	labelText: '',
	labelIcon: null,
	headerActions: [],
	contextMenu: null
}

// Card Footer
type CardFooterProps = {
	/** Children to show in the Card Footer */
	children: Node
}

export const CardFooter = (props: CardFooterProps) => {
	const { children } = props
	return <div className="card__footer">{children}</div>
}

// NOTE: WIP
// CardBuilder
// This component will build a card by taking JSON input and translating
// it into the appropriate components
type CardBuilderProps = {
	/** Card Header props */
	header: CardHeaderProps,

	/** Card Body props */
	body: CardBodyProps,

	/** Card Footer props */
	footer?: {
		/** Render buttons in the Card Footer */
		actions: Array<ButtonProps>
	}
}

const CardBuilderKey = {
	button: Button
}

export const CardBuilder = (props: CardBuilderProps) => {
	const { header, body, footer } = props
	const { title, labelText, labelIcon, actions: headerActions } = header
	const { children } = body
	const footerActions = footer && footer.actions
	return (
		<Card>
			<CardHeader
				title={title}
				labelText={labelText}
				labelIcon={labelIcon}
				actions={headerActions}
			/>
			<div
				className="card__body-inner"
				dangerouslySetInnerHTML={{ __html: children }}
			/>
			{footer && (
				<CardFooter>
					{footerActions && footerActions.length > 0
						? footerActions.map(action => {
								const Handler =
									action && action.type && CardBuilderKey[action.type]

								if (!Handler || typeof Handler === 'undefined') {
									return null
								}

								return <Handler key={action.text} kind="simple" {...action} />
						  })
						: null}
				</CardFooter>
			)}
		</Card>
	)
}

CardBuilder.defaultProps = {
	footer: null
}

// Card
type CardProps = {
	/** Should be Card Header, Card Body, and Card Footer, unless using the card background for styling only. */
	children: Node,

	/** Set true to make all content center aligned. */
	isCentered?: boolean,

	/** Set true if this card is mission-critical for the person who sees it. */
	isCritical?: boolean
}

export const Card = (props: CardProps) => {
	const { children, isCentered, isCritical } = props
	return (
		<div
			className={cx('card', {
				'card-centered': isCentered,
				'card-critical': isCritical
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
