// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
import type { Props as ButtonProps } from '../../Button/Button'
import type { Props as ContextMenuProps } from '../../ContextMenu/ContextMenu'

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
