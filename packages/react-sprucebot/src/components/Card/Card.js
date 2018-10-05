// @flow
import React from 'react'

type CardHeaderPros = {
	title?: string,
	labelText?: string,
	labelIcon?: React.Node,
	actions?: Array<React.Node>,
	contextMenu?: React.Node
}

export const CardHeader = (props: CardHeaderProps) => {
	const { title, labelText, labelIcon, actions, contextMenu } = props
	return (
		<div className="card-header">
			{(title || labelText || labelIcon) && (
				<div className="card-header__text">
					{labelIcon &&
						React.cloneElement(labelIcon, {
							className: 'card-header__label-icon'
						})}
					{labelText && (
						<span className="card-header__label-text">{labelText}</span>
					)}
					{title && <h3 className="card-header__title">{title}</h3>}
				</div>
			)}
			{(actions || contextMenu) && (
				<div className="card-header__actions">
					{actions && actions.length > 0 && actions.map(action => action)}
					{contextMenu}
				</div>
			)}
		</div>
	)
}

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

type CardFooterProps = {
	children: React.Node
}

export const CardFooter = (props: CardFooterProps) => {
	const { children } = props
	return <div className="card__footer">{children}</div>
}

type CardProps = {
	children: React.Node
}

export const Card = (props: CardProps) => {
	const { children } = props
	return <div className="card">{children}</div>
}

export default Card
