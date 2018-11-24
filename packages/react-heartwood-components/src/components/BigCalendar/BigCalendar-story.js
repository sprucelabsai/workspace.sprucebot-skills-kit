// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	date,
	text,
	object,
	number,
	boolean
} from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import BigCalendar from './BigCalendar'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

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

class BigCalendarExample extends Component {
	state = {
		users: storyUsers,
		events: storyEvents,
		userMode: 'everyone'
	}

	constructor(props) {
		super(props)
		this.bigCalRef = React.createRef()
		this
	}

	handleDropEvent = ({
		event,
		dragEvent,
		newStartAt,
		newUser,
		blockUpdates
	}) => {
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
			blockUpdates.forEach((update, blockIdx) => {
				eventCopy.blocks[blockIdx].durationSec = update.newDurationSec
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
		if (!time) {
			alert(`double clicked header for ${user.name}`)
		} else {
			alert(`double click at ${time.format('h:mm')} with ${user.name}`)
		}
	}

	handleClickView = ({ time, user }) => {
		alert(`single click at ${time.format('h:mm')} with ${user.name}`)
	}

	render() {
		const { users, events, userMode } = this.state

		return (
			<Container>
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
					defaultStartTime={text(
						'defaultStartTime',
						'09:00',
						CATEGORIES.ranges
					)}
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
								'2019-01-28': { startTime: '10:00', endTime: '18:00' }
							},
							'909beac7-42f7-443f-bd86-c762705c0c18': {
								'2019-01-28': { startTime: '08:00', endTime: '16:00' }
							},
							'ce914128-c77c-40fa-b5ef-d6faa3ed26a1': {
								'2019-01-28': { startTime: '11:00', endTime: '19:00' }
							}
						},
						CATEGORIES.schedules
					)}
					viewProps={{
						day: {
							newEventDefaultDuractionSec: number(
								'viewProps.day.newEventDefaultDuractionSec',
								900 * 4,
								{},
								CATEGORIES.dayView
							),
							allowResizeToZeroDurationBlocks: boolean(
								'viewProps.day.allowResizeToZeroDurationBlocks',
								true,
								CATEGORIES.dayView
							),
							allowResizeFirstBlockToZeroDuration: boolean(
								'viewProps.day.allowResizeFirstBlockToZeroDuration',
								false,
								CATEGORIES.dayView
							),
							dragThreshold: number(
								'viewProps.day.dragThreshold',
								10,
								{},
								CATEGORIES.dayView
							),
							dragScrollSpeed: number(
								'viewProps.day.dragScrollSpeed',
								5,
								{},
								CATEGORIES.dayView
							),
							timeGutterFormat: text(
								'viewProps.day.timeGutterFormat',
								'ha',
								CATEGORIES.dayView
							),
							scrollDuringDragMargin: number(
								'viewProps.day.scrollDuringDragMargin',
								50,
								{},
								CATEGORIES.dayView
							)
						}
					}}
					onDoubleClickView={this.handleDoubleClickView}
					onClickView={this.handleClickView}
					onChangeUserMode={this.handleUserModeChange}
					ref={this.bigCalRef}
					onDropEvent={this.handleDropEvent}
				/>
			</Container>
		)
	}
}

stories.addDecorator(withKnobs)

stories.add('Big Calendar', () => <BigCalendarExample />)
