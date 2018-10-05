// @flow
import React from 'react'

type CardHeaderPros = {
	title?: string,
	labelText?: string,
	labelIcon?: React.Node,
	headerActions?: Array<React.Node>,
	contextMenu?: React.Node
}

export const CardHeader = (props: CardHeaderProps) => {
	const { title, labelText, labelIcon, headerActions, contextMenu } = props
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
			{(headerActions || contextMenu) && (
				<div className="card-header__actions">
					{headerActions &&
						headerActions.length > 0 &&
						headerActions.map(action => action)}
					{contextMenu}
				</div>
			)}
		</div>
	)
}

CardHeader.defualtProps = {
	title: '',
	labelText: '',
	labelIcon: null,
	headerActions: [],
	contextMenu: null
}

type CardProps = {
	children: React.Node
}

export const Card = (props: CardProps) => {
	const { children } = props
	return <div className="card">{children}</div>
}

export default Card
