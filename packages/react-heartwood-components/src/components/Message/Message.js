// @flow
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'

type MessageProps = {
	/** Message children. */
	children: Node,

	/** Optional classname */
	className?: string
}

export const Message = (props: MessageProps) => {
	const { children, className } = props
	return <div className={cx('message', className)}>{children}</div>
}

export default Message
