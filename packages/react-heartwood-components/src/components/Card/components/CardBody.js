// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import CardSection from './CardSection'

// Card Body
export type CardBodyProps = {
	/** Children to show in the Card */
	children: Node,

	/** Whether to wrap children in CardSection */
	isSectioned?: boolean,

	/** Set true to display line separators between CardSection components */
	areSectionSeparatorsVisible: boolean
}

const CardBody = (props: CardBodyProps) => {
	const { children, isSectioned, areSectionSeparatorsVisible } = props
	const className = cx('card__body', {
		'card__body--section-separators-visible': areSectionSeparatorsVisible
	})
	return (
		<div className={className}>
			{isSectioned ? <CardSection>{children}</CardSection> : children}
		</div>
	)
}

CardBody.defaultProps = {
	isSectioned: true,
	areSectionSeparatorsVisible: false
}

export default CardBody
