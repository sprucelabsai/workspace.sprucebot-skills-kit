// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'
import type { Node } from 'react'
import CardSection from './CardSection'

// Card Body
export type CardBodyProps = {
	/** Children to show in the Card */
	children: Node,

	/** Whether to wrap children in CardSection */
	isSectioned?: boolean
}

const CardBody = (props: CardBodyProps) => {
	const { children, isSectioned } = props
	return (
		<div className="card__body">
			{isSectioned ? <CardSection>{children}</CardSection> : children}
		</div>
	)
}

CardBody.defaultProps = {
	isSectioned: true
}

export default CardBody