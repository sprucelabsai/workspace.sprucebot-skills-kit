// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
import type { Props as ButtonProps } from '../../Button/Button'
import type { Props as ContextMenuProps } from '../../ContextMenu/ContextMenu'

// Card Body
export type CardBodyProps = {
	/** Children to show in the Card */
	children: Node
}

const CardBody = (props: CardBodyProps) => {
	const { children } = props
	return <div className="card__body-inner">{children}</div>
}

export default CardBody
