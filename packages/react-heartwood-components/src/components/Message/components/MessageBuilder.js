// @flow
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'

import cx from 'classnames'

import Message from '../Message'

import type { MessageProps } from '../Message'

// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Text from '../../Text/Text'
import TextStyle from '../../TextStyle/TextStyle'

export type MessageBuilderProps = {
	/** Message body */
	body: Object
}

const MessageBuilderKey = {
	text: Text,
	textStyle: TextStyle
}

const renderChild = child => {
	const Handler = (child && child.type && MessageBuilderKey[child.type]) || Text
	return typeof Handler === 'function' ? (
		Handler({ ...child.props })
	) : (
		<Handler {...child.props} />
	)
}

const TemplateEngine = (text, context) => {
	var re = /{{([^}}]+)?}}/g,
		children = [],
		cursor = 0,
		match

	var add = function(line, js) {
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
	console.log('CHILDREN', children)
	return children.map(renderChild)
}

const MessageBuilder = (props: MessageBuilderProps) => {
	const { body } = props

	const { text, context } = body || {}

	return (
		<Message>
			<Text>{text && context && TemplateEngine(text, context)}</Text>
		</Message>
	)
}

export default MessageBuilder
