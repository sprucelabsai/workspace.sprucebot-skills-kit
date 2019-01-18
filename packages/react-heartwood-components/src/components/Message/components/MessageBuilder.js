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
	/** Name of message sender */
	fromName?: string,

	/** Image for message sender */
	fromImage?: string,

	/** Message body */
	dateSent?: Date,

	/** Message body */
	message?: Object,

	/** Detail string gives additional context about this message */
	detail?: string,

	/** Replies to the message */
	replies?: Array
}

const MessageBuilderKey = {
	text: Text,
	textStyle: TextStyle
}

const renderChild = child => {
	const Handler =
		(child && child.type && MessageBuilderKey[child.type]) || Fragment
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
		text = text || '',
		context = context || {},
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

	return children.map(renderChild)
}

const MessageBuilder = (props: MessageBuilderProps) => {
	const { fromName, fromImage, dateSent, message, detail, replies } = props

	const { text: messageText, context: messageContext } = message || {}

	var messageReplies = []

	if (replies) {
		messageReplies = replies.map(reply => {
			return {
				type: reply.type,
				children: TemplateEngine(reply.text, reply.context)
			}
		})
	}

	return (
		<Message
			fromName={fromName}
			fromImage={fromImage}
			dateSent={dateSent}
			children={
				messageText &&
				messageContext &&
				TemplateEngine(messageText, messageContext)
			}
			detail={detail}
			replies={messageReplies}
		/>
	)
}

export default MessageBuilder
