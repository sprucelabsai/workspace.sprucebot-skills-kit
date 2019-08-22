// @flow
import React, {
	Fragment,
	ReactNode,
	ReactElement,
	ReactHTMLElement
} from 'react'
import cx from 'classnames'

import Button from '../Button/Button'
import TextStyle from '../TextStyle/TextStyle'

// Components available for templating

const TextComponentKey = {
	style: TextStyle,
	button: Button
}

// Allows basic templating functionality on text strings

const TemplateEngine = (text = '', context = {}) => {
	let re = /{{([^}}]+)?}}/g,
		children = [],
		cursor = 0

	let add = function(line: string, templateVar?: string) {
		if (line !== '') {
			children.push({
				props: { element: 'span', children: line.replace(/"/g, '\\"') }
			})
		}
		if (templateVar && context[templateVar]) {
			children.push(context[templateVar])
		}
	}

	const matches = text.match(re)

	if (matches) {
		matches.forEach(() => {
			const matched = re.exec(text)
			add(text.slice(cursor, matched.index), matched[1])
			cursor = matched.index + matched[0].length
		})
	}

	add(text.substr(cursor, text.length - cursor))

	return children.map(renderText)
}

const renderText = child => {
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

export interface ITextProps {
	/** Contents of the component. */
	children: ReactNode

	/** Class name for the component */
	className?: string

	/** Context allows basic templatizing of text strings for formatting/rich interaction purposes */
	context?: Record<string, any>

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

const Text: React.StatelessComponent<ITextProps> = (
	props: ITextProps
): React.ReactElement => {
	const {
		children: originalChildren,
		className,
		element,
		context,
		...rest
	} = props
	let Element: any = 'p'
	let children = originalChildren

	if (element) {
		Element = element
	}

	if (context && typeof children === 'string') {
		children = TemplateEngine(children, context)
	}

	return (
		<Element className={cx('text', className)} {...rest}>
			{children}
		</Element>
	)
}

export const Span: React.StatelessComponent<ITextProps> = (
	props: ITextProps
): React.ReactElement => {
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
