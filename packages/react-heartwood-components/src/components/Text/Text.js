// @flow
import React, { Fragment } from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import TextStyle from '../TextStyle/TextStyle'

import type { Node } from 'react'

// Components available for templating

const TextComponentKey = {
	style: TextStyle,
	button: Button
}

// Allows basic templating functionality on text strings

const TemplateEngine = (text = '', context = {}) => {
	let re = /{{([^}}]+)?}}/g,
		children = [],
		cursor = 0,
		match

	let add = function(line, js) {
		if (line !== '') {
			children.push({
				props: { element: 'span', children: line.replace(/"/g, '\\"') }
			})
		}
		if (context[js]) {
			children.push(context[js])
		}
	}
	while ((match = re.exec(text))) {
		add(text.slice(cursor, match.index), match[1])
		cursor = match.index + match[0].length
	}
	add(text.substr(cursor, text.length - cursor))

	return children.map(renderText)
}

const renderText = child => {
	console.log('CHILD', child)
	const { children, ...rest } = child.props
	const handlerProps = { children: child.text || children, ...rest }
	const Handler =
		(child && child.type && TextComponentKey[child.type]) || Fragment
	return typeof Handler === 'function' ? (
		Handler({ ...handlerProps })
	) : (
		<Handler {...handlerProps} />
	)
}

export type TextProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Context allows basic templatizing of text strings for formatting/rich interaction purposes */
	context?: Object,

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
	const { children, className, element, context, ...rest } = props
	let Element = 'p'
	let text = children

	if (element) {
		Element = element
	}

	if (context && typeof children === 'string') {
		text = TemplateEngine(children, context)
	}

	return (
		<Element className={cx('text', className)} {...rest}>
			{text}
		</Element>
	)
}

export const Span = (props: TextProps) => {
	const { children, className, element, ...rest } = props

	return (
		<Text
			element={element || 'span'}
			className={cx('text', className)}
			{...rest}
		>
			{children}
		</Text>
	)
}

export default Text
