// @flow

import React from 'react'
import type { Element, Node } from 'react'

// Card Section
export type CardSectionProps = {
	/** Children to show in the Card */
	children: Node
}

const CardSection = (props: CardSectionProps) => {
	const { children } = props
	return <div className="card__section">{children}</div>
}

export default CardSection
