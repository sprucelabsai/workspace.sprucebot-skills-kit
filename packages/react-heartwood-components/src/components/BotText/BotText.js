// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'

type Props = {
	/** Use for simple text. */
	text?: string,

	/** May be used instead of text, i.e. if the Bot Text needs to include a link. */
	children?: Node,

	/** Optional class to add. */
	className?: string
}

const BotText = (props: Props) => {
	const { text, children, className, ...rest } = props

	if (!children && !text) {
		// TODO: Handle logging
		// console.error('Bot Text must either have children or text')
		return null
	}

	if (text && !children) {
		return (
			<p
				className={cx('bot-text', className)}
				dangerouslySetInnerHTML={{ __html: text }}
				{...rest}
			/>
		)
	}
	if (children && !text) {
		return (
			<p className={cx('bot-text', className)} {...rest}>
				{children}
			</p>
		)
	}
	return null
}

export default BotText
