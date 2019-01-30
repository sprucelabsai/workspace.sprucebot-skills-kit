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

	/** Text for the empty state of this feed */
	emptyText?: string,

	/** Callback to load rows */
	onRowsRequested: Function,

	/** Number of messages to load at a time */
	pageSize?: number
}

type State = {
	rows: Array<MessageProps>,
	groups: Object,
	rowCount: number,
	scrollToIndex: number,
	isLoading: boolean,
	allLoaded: boolean
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
	const groups = {}

	messages.forEach((message, idx) => {
		const daySent = message.dateSent.calendar(null, {
			sameDay: '[Today]',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: message.dateSent.isSame(new Date(), 'year')
				? 'ddd, MMMM DD'
				: 'ddd, MMMM DD, YYYY'
		})
		const match = Object.values(groups).findIndex(value => value === daySent)
		if (match === -1) {
			groups[idx] = daySent
		}
	})

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

	return groups
}

export default class FeedBuilder extends Component<Props, State> {
	list: any
	cache = new CellMeasurerCache({
		fixedWidth: true
	})
	state = {
		rows: [],
		groups: {},
		rowCount: 0,
		scrollToIndex: 1,
		isLoading: false,
		allLoaded: false
	}

	static defaultProps = {
		messages: [],
		emptyText: 'No messages',
		pageSize: 50
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		const { messages } = props
		const { rowCount } = state
		const formattedMessages = formatMessages(messages)
		const reversedMessages = [...formattedMessages].reverse()
		const groups = groupMessages(reversedMessages)
		if (messages.length === rowCount) {
			// Stop loading — there are no more messages to add
			return {
				rows: reversedMessages,
				rowCount: messages.length,
				scrollToIndex: messages.length + 1,
				groups,
				isLoading: false,
				allLoaded: true
			}
		}
		return {
			rows: reversedMessages,
			rowCount: messages.length,
			scrollToIndex: messages.length + 1,
			groups,
			isLoading: false
		}
	}

	onResize = () => {
		if (this.list && this.cache) {
			this.cache.clearAll()
			this.list.recomputeRowHeights(0)
			this.list.forceUpdateGrid()
		}
	}

	isRowLoaded = ({ index }) => {
		const { messages } = this.props
		return index > 0
	}

	loadMoreRows = ({ startIndex, stopIndex }) => {
		const { messages, onRowsRequested, pageSize } = this.props
		const { isLoading, allLoaded } = this.state
		// Do API Stuff™

		if (isLoading || allLoaded) {
			return
		}

		if (this.list) {
			this.setState({
				isLoading: true
			})
			onRowsRequested()
			this.cache.clearAll()
			this.list.recomputeRowHeights(0)
			this.list.forceUpdateGrid()
		}
		let done
		return new Promise(resolve => (done = resolve))
	}

	renderRow = ({ index, key, parent, style, isScrolling, isVisible }) => {
		const { messages } = this.props
		const { rows, groups } = this.state
		const groupMatch = groups[index]

		return (
			<CellMeasurer
				cache={this.cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div
					className="message-feed__message-wrapper"
					style={{
						...style,
						visibility: isScrolling ? 'visible' : 'visible'
					}}
				>
					{groupMatch && (
						<Text className="message-feed__day-header">{groupMatch}</Text>
					)}
					<MessageBuilder {...rows[index]} />
				</div>
			</CellMeasurer>
		)
	}

	render() {
		const { messages, emptyText, pageSize } = this.props
		const { scrollToIndex, rowCount } = this.state
		return (
			<div className="message-feed__wrapper">
				<div className="message-feed">
					<InfiniteLoader
						ref={ref => (this.infiniteLoader = ref)}
						isRowLoaded={this.isRowLoaded}
						loadMoreRows={this.loadMoreRows}
						rowCount={rowCount + 1}
						threshold={1}
					>
						{({ onRowsRendered, registerChild }) => (
							<AutoSizer
								className="message-feed__autosizer"
								onResize={this.onResize}
							>
								{({ height, width }) => (
									<div ref={registerChild}>
										<List
											ref={ref => (this.list = ref)}
											className="message-feed__virtual-list"
											deferredMeasurementCache={this.cache}
											height={height}
											width={width}
											rowCount={rowCount}
											rowHeight={this.cache.rowHeight}
											rowRenderer={this.renderRow}
											scrollToIndex={pageSize + 5}
											scrollToAlignment="end"
											onRowsRendered={onRowsRendered}
										/>
									</div>
								)}
							</AutoSizer>
						)}
					</InfiniteLoader>
				</div>
			</div>
		)
	}
}
