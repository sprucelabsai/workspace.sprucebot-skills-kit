// @flow
import React, { Fragment } from 'react'

import cx from 'classnames'

import Message from '../Message'

import type {} from '../Message'
import type { Props as ButtonProps } from '../../Button/Button'

// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Text from '../../Text/Text'
import TextStyle from '../../TextStyle/TextStyle'
import Button from '../../Button/Button'
import Image from '../../Image/Image'

type FromProps = {
	/** Unique id of the sender */
	id: string,

	/** Image associated with message sender */
	image?: string,

	/** Name associated with message sender */
	name?: string,

	/** Alt description with message sender */
	alt?: string
}

export type MessageBuilderProps = {
	/** Information about the sender */
	from: FromProps,

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
	attachments?: Array,

	/** Set true if the message is from Sprucebot */
	isFromSprucebot?: boolean
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

	return children.map(renderMessageChild)
}

const MessageBuilder = (props: MessageBuilderProps) => {
	const {
		from,
		dateSent,
		message,
		detail,
		primaryAction,
		replies,
		attachments,
		isFromSprucebot
	} = props

	const { text: messageText, context: messageContext } = message || {}

	let messageReplies = []
	let messageAttachments = []

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
			from={from}
			dateSent={dateSent}
			detail={detail}
			primaryAction={primaryAction}
			replies={messageReplies}
			attachments={messageAttachments}
			isFromSprucebot={isFromSprucebot}
		>
			{messageText &&
				messageContext &&
				TemplateEngine(messageText, messageContext)}
		</Message>
	)
}

export default MessageBuilder
