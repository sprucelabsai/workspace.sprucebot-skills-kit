// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment-timezone'
import FeedBuilder from './FeedBuilder'
import Page, { PageContent } from '../../../Page'
import View from '../../../View/View'
import { Sidebar, SidebarSection } from '../../../Core'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import { messages, generateMessages } from '../../../../../.storybook/data/feed'

import user01image from '../../../../../static/assets/users/user-01--96w.png'

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
				messages: [...prevState.messages].concat(newMessages)
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
