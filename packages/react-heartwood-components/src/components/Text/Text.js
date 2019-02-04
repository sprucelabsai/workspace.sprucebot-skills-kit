// @flow
import React from 'react'
import cx from 'classnames'

export type TextProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** The element to render. Defaults to p for Text and span for Span */
	// eslint-disable-next-line flowtype/space-after-type-colon
	element?:
		| 'a'
		| 'abbr'
		| 'blockquote'
		| 'br'
		| 'cite'
		| 'code'
		| 'data'
		| 'dd'
		| 'dl'
		| 'dt'
		| 'figcaption'
		| 'figure'
		| 'kbd'
		| 'li'
		| 'mark'
		| 'ol'
		| 'p'
		| 'pre'
		| 'q'
		| 's'
		| 'span'
		| 'sub'
		| 'sup'
		| 'time'
		| 'ul'
}

const Text = (props: TextProps) => {
	const { children, className, element, ...rest } = props
	let Element = 'p'
	if (element) {
		Element = element
	}

	return (
		<Element className={cx('text', className)} {...rest}>
			{children}
		</Element>
	)
}

export const Span = (props: TextProps) => {
	const { children, className, element, ...rest } = props
	let Element = 'span'
	if (element) {
		Element = element
	}

	return (
		<Element className={cx('text', className)} {...rest}>
			{children}
		</Element>
	)
}

export default Text
