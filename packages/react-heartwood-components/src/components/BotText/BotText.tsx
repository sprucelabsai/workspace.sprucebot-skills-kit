import React, { Fragment } from 'react'
import cx from 'classnames'

interface IBotTextProps {
	/** Use for simple text. */
	text?: string

	/** May be used instead of text, i.e. if the Bot Text needs to include a link. */
	children?: React.ReactNode

	/** Optional class to add. */
	className?: string
}

const BotText: React.StatelessComponent<IBotTextProps> = (
	props: IBotTextProps
): React.ReactElement => {
	const { text, children, className, ...rest } = props

	if (!children && !text) {
		// TODO: Handle logging
		// console.error('Bot Text must either have children or text')
		return <Fragment />
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

	return <Fragment />
}

export default BotText
