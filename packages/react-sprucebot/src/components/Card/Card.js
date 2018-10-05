// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'
import Button from '../Button/Button'

// Card Header
type CardHeaderPros = {
	title?: string,
	labelText?: string,
	labelIcon?: React.Node,
	actions?: React.Node,
	contextMenu?: React.Node
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
									className: 'card-header__label-icon'
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
					{actions}
					{contextMenu}
				</div>
			)}
		</div>
	)
}

// Card Body
type CardBodyProps = {
	children: React.Node
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
	children: React.Node
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
	header: {
		title: string,
		labelText?: string,
		labelIcon?: string,
		actions?: Array<{
			type: 'button' | 'contextMenu',
			actions?: Array<{
				text: string,
				icon: string
			}>,
			text?: string,
			icon?: string
		}>
	},
	body: {
		children: Array<{
			content: string
		}>
	},
	footer?: {
		actions: Array<{
			text: string,
			icon?: string
		}>
	}
}

const CardBuilderKey = {
	button: Button
}

export const CardBuilder = (props: CardBuilderProps) => {
	const { header, body, footer } = props
	const { title, labelText, labelIcon, actions: headerActions } = header
	const { children } = body
	const { actions: footerActions } = footer
	return (
		<Card>
			<CardHeader
				title={title}
				labelText={labelText}
				labelIcon={labelIcon}
				actions={
					headerActions &&
					headerActions.length > 0 &&
					headerActions.map(action => {
						const Handler = CardBuilderKey[action.type]

						if (!Handler || typeof Handler === 'undefined') {
							return null
						}

						return <Handler key={action.text} kind="simple" {...action} />
					})
				}
			/>
			<div
				className="card__body-inner"
				dangerouslySetInnerHTML={{ __html: children }}
			/>
			{footer && (
				<CardFooter>
					{footerActions &&
						footerActions.length > 0 &&
						footerActions.map(action => {
							const Handler = CardBuilderKey[action.type]
							console.log({ Handler })

							if (!Handler || typeof Handler === 'undefined') {
								return null
							}

							return <Handler key={action.text} kind="simple" {...action} />
						})}
				</CardFooter>
			)}
		</Card>
	)
}

// Card
type CardProps = {
	children: React.Node
}

export const Card = (props: CardProps) => {
	const { children } = props
	return <div className="card">{children}</div>
}

export default Card
