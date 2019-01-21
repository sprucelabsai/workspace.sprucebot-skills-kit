// @flow
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'

import cx from 'classnames'

import Message from '../Message'

import type { MessageProps } from '../Message'
import type { Props as ButtonProps } from '../../Button/Button'

// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Text from '../../Text/Text'
import TextStyle from '../../TextStyle/TextStyle'
import Button from '../../Button/Button'
import Image from '../../Image/Image'

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

	/** An action related to this message */
	primaryAction?: ButtonProps,

	/** Contextual information and additional actions associated to the message */
	replies?: Array,

	/** Attachment content associated to the message */
	attachments?: Array
}

const MessageBuilderKey = {
	text: Text,
	textStyle: TextStyle,
	button: Button
}

const MessageAttachmentKey = {
	image: Image
}

const renderMessageChild = child => {
	const Handler =
		(child && child.type && MessageBuilderKey[child.type]) || Fragment
	return typeof Handler === 'function' ? (
		Handler({ ...child.props })
	) : (
		<Handler {...child.props} />
	)
}

const renderAttachmentChild = child => {
	const Handler =
		(child && child.type && MessageAttachmentKey[child.type]) || Fragment
	const className = cx(child.props.className, {
		'message__attachment-image': child.type === 'image'
	})
	return typeof Handler === 'function' ? (
		Handler({ className, ...child.props })
	) : (
		<Handler className={className} {...child.props} />
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

	return children.map(renderMessageChild)
}

const MessageBuilder = (props: MessageBuilderProps) => {
	const {
		fromName,
		fromImage,
		dateSent,
		message,
		detail,
		primaryAction,
		replies,
		attachments
	} = props

	const { text: messageText, context: messageContext } = message || {}

	var messageReplies = []
	var messageAttachments = []

	if (replies) {
		messageReplies = replies.map(reply => {
			return {
				type: reply.type,
				children: TemplateEngine(reply.text, reply.context)
			}
		})
	}

	if (attachments) {
		messageAttachments = attachments.map(renderAttachmentChild)
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
			primaryAction={primaryAction}
			replies={messageReplies}
			attachments={messageAttachments}
		/>
	)
}

export default MessageBuilder
