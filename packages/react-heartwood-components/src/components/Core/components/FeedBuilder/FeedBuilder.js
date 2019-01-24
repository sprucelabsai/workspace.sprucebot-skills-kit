// @flow
import React, { Fragment } from 'react'
import moment from 'moment-timezone'
import Message, { MessageBuilder } from '../../../Message'
import Text from '../../../Text/Text'

import type from '../../../Message'

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
				formattedMessage.from = {
					...formattedMessage.from,
					image: null
				}
			}
		}

		formattedMessages.push(formattedMessage)
	})
	return formattedMessages
}

const groupMessages = (messages: Array<MessageProps>) => {
	const groupedMessages = []

	messages.forEach((message, idx) => {
		const daySent = message.dateSent.calendar(null, {
			sameDay: '[Today]',
			lastDay: '[Yesterday]'
		})
		const match = groupedMessages.find(group => group.name === daySent)
		if (!match) {
			groupedMessages.push({
				name: daySent,
				messages: [idx]
			})
		} else {
			match.messages.push(idx)
		}
	})
	console.log({ groupedMessages })

	return groupedMessages
}

const FeedBuilder = (props: Props) => {
	const { messages, emptyText } = props
	const formattedMessages = formatMessages(messages)
	const messageGroups = groupMessages(formattedMessages)
	return (
		<div className="message-feed__wrapper">
			<div className="message-feed">
				{messageGroups && messageGroups.length > 0 ? (
					messageGroups.map(group => (
						<Fragment key={group.name}>
							{group.messages.map(messageIdx => (
								<MessageBuilder
									key={messageIdx}
									{...formattedMessages[messageIdx]}
								/>
							))}
							<Text className="message-feed__day-header">{group.name}</Text>
						</Fragment>
					))
				) : (
					<p>{emptyText}</p>
				)}

				{/* {formattedMessages && formattedMessages.length > 0 ? (
					formattedMessages.map((message, idx) => {
						return <MessageBuilder key={message.id} {...message} />
					})
				) : (
					<p>{emptyText}</p>
				)} */}
			</div>
		</div>
	)
}

FeedBuilder.defaultProps = {
	messages: [],
	emptyText: 'No messages'
}

export default FeedBuilder
