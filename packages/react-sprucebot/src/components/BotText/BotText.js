// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'

type Props = {
	text?: string,
	children?: Node,
	className?: string
}

const BotText = (props: Props) => {
	const { text, children, className, ...rest } = props

	if (!children && !text) {
		console.error('Bot Text must either have children or text')
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
