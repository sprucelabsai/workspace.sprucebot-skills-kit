// @flow

import React from 'react'
import type { Node } from 'react'

import cx from 'classnames'

// Card Section
export type CardSectionProps = {
	/** Children to show in the Card */
	children: Node,

	/** Set to true to remove horizontal padding */
	isFullBleed: boolean
}

const CardSection = (props: CardSectionProps) => {
	const { children, isFullBleed } = props
	const className = cx('card__section', {
		'card__section--full-bleed': isFullBleed
	})
	return <div className={className}>{children}</div>
}

export default CardSection
