// @flow
import React from 'react'
import cx from 'classnames'

export type TextProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string
}

const Text = (props: TextProps) => {
	const { children, className } = props

	return <p className={cx('text', className)}>{children}</p>
}

export default Text
