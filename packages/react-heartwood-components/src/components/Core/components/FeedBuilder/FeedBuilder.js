// @flow
import React, { Component, Fragment } from 'react'
import moment from 'moment-timezone'
import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader
} from 'react-virtualized'
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

	/** The total number of messages in the feed. Used for infinite scrolling. */
	messageCount?: number,

	/** Text for the empty state of this feed */
	emptyText?: string,

	/** Callback to load rows */
	onRowsRequested: Function,

	/** Number of messages to load at a time */
	pageSize?: number
}

type State = {
	rows: Array<MessageProps>,
	rowCount: number,
	scrollToIndex: number
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
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: message.dateSent.isSame(new Date(), 'year')
				? 'ddd, MMMM DD'
				: 'ddd, MMMM DD, YYYY'
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

	return groupedMessages
}

export default class FeedBuilder extends Component<Props, State> {
	list: any
	cache = new CellMeasurerCache({})
	state = {
		rows: [],
		rowCount: this.props.messages.length,
		scrollToIndex: this.props.messages.length + 1
	}
	static defaultProps = {
		messages: [],
		messageCount: 0,
		emptyText: 'No messages',
		pageSize: 50
	}

	isRowLoaded = ({ index }) => {
		const { messages } = this.props
		return index > 0
	}

	loadMoreRows = ({ startIndex, stopIndex }) => {
		const { messages, messageCount, onRowsRequested } = this.props
		// Do API Stuff™

		if (this.list && messages.length < messageCount) {
			onRowsRequested()
			this.cache.clearAll()
			this.list.recomputeRowHeights(0)
			this.setState(prevState => ({
				rowCount: messages.length + 50,
				scrollToIndex: messages.length + 50 - prevState.rowCount
			}))
		}
		let done
		return new Promise(resolve => (done = resolve))
	}

	renderRow = ({ index, key, parent, style, isScrolling, isVisible }) => {
		const { messages } = this.props
		const reversedMessages = [...messages].reverse()

		return (
			<CellMeasurer
				cache={this.cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div className="message-feed__message-wrapper" key={key} style={style}>
					<MessageBuilder {...reversedMessages[index]} />
				</div>
			</CellMeasurer>
		)
	}

	render() {
		const { messages, messageCount, emptyText, pageSize } = this.props
		const { scrollToIndex, rowCount } = this.state
		// const formattedMessages = formatMessages(messages)
		// const messageGroups = groupMessages(formattedMessages)
		return (
			<div className="message-feed__wrapper">
				<div className="message-feed">
					<InfiniteLoader
						ref={ref => (this.infiniteLoader = ref)}
						isRowLoaded={this.isRowLoaded}
						loadMoreRows={this.loadMoreRows}
						rowCount={messageCount}
						threshold={1}
					>
						{({ onRowsRendered, registerChild }) => (
							<AutoSizer className="message-feed__autosizer">
								{({ height, width }) => (
									<div ref={registerChild}>
										<List
											ref={ref => (this.list = ref)}
											className="message-feed__virtual-list"
											height={height}
											width={width}
											rowCount={rowCount}
											rowHeight={this.cache.rowHeight}
											rowRenderer={this.renderRow}
											scrollToIndex={pageSize}
											scrollToAlignment="end"
											onRowsRendered={onRowsRendered}
										/>
									</div>
								)}
							</AutoSizer>
						)}
					</InfiniteLoader>
					{/* {messageGroups && messageGroups.length > 0 ? (
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
						<Text className="message-feed__empty-text">{emptyText}</Text>
					)} */}
				</div>
			</div>
		)
	}
}
