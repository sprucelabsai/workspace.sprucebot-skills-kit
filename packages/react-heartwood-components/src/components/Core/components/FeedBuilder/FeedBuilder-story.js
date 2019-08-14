// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import FeedBuilder from './FeedBuilder'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import { generateMessages } from '../../../../../.storybook/data/feed'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Feed Builder', module)

stories.addDecorator(ProvideStyles)

type Props = {}
type State = {
	messages: Array<Object>
}

class FeedBuilderExample extends Component<Props, State> {
	state = {
		messages: generateMessages({ count: 50, interval: 31 })
	}

	onRowsRequested = () => {
		this.setState(prevState => {
			const lastMessageDate =
				prevState.messages[prevState.messages.length - 1].dateSent
			const lastMessageIndex = prevState.messages.length
			const newMessages = generateMessages({
				count: 50,
				interval: 31,
				startDate: lastMessageDate,
				startIndex: lastMessageIndex
			})
			return {
				messages:
					prevState.messages.length < 500
						? [...prevState.messages].concat(newMessages)
						: prevState.messages
			}
		})
	}

	render() {
		const { messages } = this.state
		return (
			<FeedBuilder
				messages={messages}
				messageCount={500}
				onRowsRequested={this.onRowsRequested}
				pageSize={50}
			/>
		)
	}
}

stories.add('Basic', () => <FeedBuilderExample STORYBOOKdoNotWrap />)
