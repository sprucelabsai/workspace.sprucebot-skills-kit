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
	messages: Array<MessageProps>
}

const FeedBuilder = (props: Props) => {
	const { messages } = props
	return <div className="message-feed" />
}

FeedBuilder.defaultProps = {}

export default FeedBuilder
