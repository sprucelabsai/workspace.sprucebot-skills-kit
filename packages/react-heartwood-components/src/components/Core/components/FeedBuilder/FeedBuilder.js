// @flow
import React from 'react'
import Message, { MessageBuilder } from '../../../Message'

import type { MessageBuilderProps } from '../../../Message'

type MessageProps = {
	/** Unique id for the message */
	id: string,
	...MessageBuilderProps
}

type Props = {
	/** Messages for the feed */
	messages?: Array<MessageProps>,

	/** Text for the empty state of this feed */
	emptyText?: string
}

// The difference in minutes between two message where only the first one
// should include an image
const compareDiff = 30

const formatMessages = (messages: Array<MessageProps>) => {
	const formattedMessages = []
	messages.forEach((message, idx) => {
		let formattedMessage = { ...message }
		// Check if messages are from the same source
		if (
			idx + 1 < messages.length &&
			message.from &&
			messages[idx + 1].from &&
			message.from.id === messages[idx + 1].from.id
		) {
			// Check if the messages were sent within the minimum difference to hide the image
			const nextMessage = messages[idx + 1]
			const diff = message.dateSent.diff(nextMessage.dateSent, 'minutes')
			if (diff <= compareDiff) {
				// Remove the image
				formattedMessage.fromImage = null
			}
		}

		formattedMessages.push(formattedMessage)
	})
	return formattedMessages
}

const FeedBuilder = (props: Props) => {
	const { messages, emptyText } = props
	const formattedMessages = formatMessages(messages)
	return (
		<div className="message-feed">
			{formattedMessages && formattedMessages.length > 0 ? (
				formattedMessages.map(message => (
					<MessageBuilder key={message.id} {...message} />
				))
			) : (
				<p>{emptyText}</p>
			)}
		</div>
	)
}

FeedBuilder.defaultProps = {
	messages: [],
	emptyText: 'No messages'
}

export default FeedBuilder
