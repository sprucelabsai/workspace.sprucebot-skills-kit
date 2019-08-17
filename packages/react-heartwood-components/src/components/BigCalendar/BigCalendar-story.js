// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { cloneDeep, remove } from 'lodash'
import moment from 'moment'
import {
	withKnobs,
	date,
	text,
	object,
	number,
	boolean
} from '@storybook/addon-knobs/react'

import BigCalendar from './BigCalendar'
import ToastWrapper from '../Toast/components/ToastWrapper/ToastWrapper'

import type { User, Event } from './types'

// Mock data
import storyUsers from './storyUsers'
import storyEvents from './storyEvents'

const stories = storiesOf('Big Calendar', module)
const today = moment()

const CATEGORIES = {
	data: 'Data',
	ranges: 'Date/Time Ranges',
	modes: 'User Modes',
	formatting: 'Formatting',
	dayView: 'Day View',
	interactions: 'Interactions',
	schedules: 'Schedules'
}
type Props = {}
type State = {
	users: Array<Object>,
	events: Array<Object>,
	userMode: string,
	toasts: Array<Object>
}

class BigCalendarExample extends Component<Props, State> {
	state = {
		users: storyUsers,
		events: storyEvents,
		userMode: 'everyone',
		toasts: []
	}

	bigCalRef: { current: any }

	constructor(props) {
		super(props)
		this.bigCalRef = React.createRef()
	}

	componentDidMount = () => {
		document.body && (document.body.style.overflow = 'hidden')
		document.body &&
			(document.body.querySelector('.page__content').style.padding = '0px')
	}

	addToast = ({ headline, text, kind, id, showFollowup, timeout }) => {
		this.setState(prevState => {
			const newToasts = [...prevState.toasts]
			newToasts.push({
				headline: headline,
				text: text,
				kind,
				id: id,
				followupAction: showFollowup ? () => console.log('Undo') : null,
				timeout: timeout
			})
			return {
				toasts: newToasts
			}
		})
	}

	removeToast = id => {
		this.setState(prevState => {
			const toasts = [...prevState.toasts]
			remove(toasts, item => {
				return item.id === id
			})
			return {
				toasts
			}
		})
	}

	handleDropEvent = ({ event, newStartAt, newUser, blockUpdates }) => {
		if (!event) {
			alert(
				`you created a new event at ${newStartAt.format(
					'YYYY-MM-DD HH:mma'
				)} for ${newUser.name}`
			)
			return false
		}
		console.log({ event, newStartAt, newUser, blockUpdates })
		const eventsCopy = [...this.state.events]
		const eventCopy = cloneDeep(event)
		if (
			event.userId === 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27' ||
			(newUser && newUser.id === 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27')
		) {
			return false
		} else if (newUser) {
			eventCopy.userId = newUser.id
		}

		if (newStartAt) {
			eventCopy.startAt = newStartAt.format('YYYY-MM-DD HH:mm:ss')
		}

		if (blockUpdates) {
			blockUpdates.forEach(update => {
				eventCopy.blocks[update.blockIdx].durationSec = update.newDurationSec
			})
		}

		eventCopy.blocks = eventCopy.blocks.filter(block => block.durationSec > 0)
		const eventIdx = this.state.events.indexOf(event)
		eventsCopy.splice(eventIdx, 1)
		eventsCopy.push(eventCopy)

		this.setState({ events: eventsCopy })
		return true
	}

	handleUserModeChange = mode => {
		let users
		switch (mode) {
			case 'everyone':
				users = storyUsers
				break
			case 'me':
				users = [storyUsers[0]]
				break
			case 'working':
				users = [storyUsers[0], storyUsers[3], storyUsers[4]]
				break
		}
		this.setState({ userMode: mode, users })
	}

	handleDoubleClickView = ({ time, user }) => {
		this.addToast({
			headline: `Double Click`,
			text: time
				? `${time.format('h:mm')} with ${user.name}`
				: `Header for ${user.name}`,
			kind: 'positive',
			id: Math.random(),
			showFollowup: false,
			timeout: 2000
		})
	}

	handleClickView = ({ time, user }) => {
		this.addToast({
			headline: `Single Click`,
			text: `${time.format('h:mm')} with ${user.name}`,
			kind: 'positive',
			id: Math.random(),
			showFollowup: false,
			timeout: 2000
		})
	}

	render() {
		const { users, events, userMode, toasts } = this.state

		return (
			<BigCalendar
				// users={object('users', users, CATEGORIES.data)}
				// allEvents={object('allEvents', events, CATEGORIES.data)}
				users={users}
				allEvents={events}
				defaultStartDate={date(
					'defaultStartDate',
					today.toDate(),
					CATEGORIES.ranges
				)}
				slotsPerHour={number(
					'slotsPerHour',
					4,
					{ range: true, min: 1, max: 12 },
					CATEGORIES.ranges
				)}
				timezone={text('timezone', 'America/Denver', CATEGORIES.ranges)}
				defaultMinTime={text('defaultMinTime', '07:00', CATEGORIES.ranges)}
				defaultMaxTime={text('defaultMaxTime', '20:00', CATEGORIES.ranges)}
				defaultStartTime={text('defaultStartTime', '09:00', CATEGORIES.ranges)}
				defaultEndTime={text('defaultEndTime', '18:00', CATEGORIES.ranges)}
				userModeOptions={object(
					'userModeOptions',
					{
						everyone: 'Everyone',
						working: 'Working',
						me: 'Me'
					},
					CATEGORIES.modes
				)}
				userMode={text('userMode', userMode, CATEGORIES.modes)}
				headerDateFormat={text(
					'headerDateFormat',
					'MMMM YYYY',
					CATEGORIES.formatting
				)}
				mobileHeaderDateFormat={text(
					'mobileHeaderDateFormat',
					'MMMM Do, YYYY',
					CATEGORIES.formatting
				)}
				eventTimeFormat={text(
					'eventTimeFormat',
					'h:mma',
					CATEGORIES.formatting
				)}
				longPressDelay={number(
					'longPressDelay',
					500,
					{},
					CATEGORIES.interactions
				)}
				doubleClickToCreate={boolean(
					'doubleClickToCreate',
					false,
					CATEGORIES.interactions
				)}
				doubleClickTime={number(
					'doubleClickTime',
					250,
					{},
					CATEGORIES.interactions
				)}
				userSchedules={object(
					'userSchedules',
					{
						'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff': {
							[today.format('YYYY-MM-DD')]: {
								startTime: '10:15',
								endTime: '18:00'
							}
						},
						'909beac7-42f7-443f-bd86-c762705c0c18': {
							[today.format('YYYY-MM-DD')]: {
								startTime: '08:45',
								endTime: '16:00'
							}
						},
						'ce914128-c77c-40fa-b5ef-d6faa3ed26a1': {
							[today.format('YYYY-MM-DD')]: {
								startTime: '11:30',
								endTime: '19:00'
							}
						}
					}}
					onDoubleClickView={this.handleDoubleClickView}
					onClickView={this.handleClickView}
					onChangeUserMode={this.handleUserModeChange}
					ref={this.bigCalRef}
					onDropEvent={this.handleDropEvent}
				/>
				<ToastWrapper toasts={toasts} handleRemove={this.removeToast} />
			</div>
		)
	}
}

stories.addDecorator(withKnobs)

stories.add('Big Calendar', () => (
	<BigCalendarExample STORYBOOKdoNotWrap={false} />
))
