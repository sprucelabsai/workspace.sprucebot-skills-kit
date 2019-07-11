// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'
import type { Node } from 'react'

// Card Footer
export type CardFooterProps = {
	/** Children to show in the Card Footer */
	children: Node
}

const CardFooter = (props: CardFooterProps) => {
	const { children } = props
	return <div className="card__footer">{children}</div>
}

export default CardFooter
