// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import BigCalendar from './BigCalendar'
import cloneDeep from 'lodash/cloneDeep'

// Mock data
import storyUsers from './storyUsers'
import storyEvents from './storyEvents'

const stories = storiesOf('Big Calendar', module)

class BigCalendarExample extends Component {
	state = {
		users: storyUsers,
		events: storyEvents,
		// events: [],
		location: {
			id: '9139bfeb-7143-4a50-abad-2f768decb1d1',
			name: 'Barbershop #32',
			addressLine1: '3833 Steele st',
			addressLine2: 'Unit D',
			addressCity: 'Denver',
			addressState: 'CO',
			addressZip: '80205',
			addressCountry: 'US',
			geo: {
				lat: 39.7695943,
				lng: -104.9500088
			},
			OrganizationId: 'bc02c800-60f2-4e37-8ed1-a32f6a50e0a2',
			isPublic: false,
			timezone: 'America/Denver',
			archived: false,
			profileImages: {
				profile60:
					'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
				'profile60@2x':
					'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
				profile150:
					'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
				'profile150@2x':
					'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
			},
			phoneNumber: null,
			enableLockScreen: true
		}
	}

	constructor(props) {
		super(props)
		this.bigCalRef = React.createRef()
	}

	handleDropEvent = ({ event, newStartAt, newUser, blockUpdates }) => {
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

	handleUserModeChange = e => {
		switch (e.target.value) {
			case 'everyone':
				this.bigCalRef.current.setCurrentUsers(storyUsers)
				break
			case 'me':
				this.bigCalRef.current.setCurrentUsers([storyUsers[0]])
				break
			case 'working':
				this.bigCalRef.current.setCurrentUsers([
					storyUsers[0],
					storyUsers[3],
					storyUsers[4]
				])
				break
		}
		console.log(e.target.value)
	}

	render() {
		const { users, location, events } = this.state

		return (
			<Container>
				<BigCalendar
					ref={this.bigCalRef}
					userModeOptions={{
						everyone: 'Everyone',
						working: 'Working',
						me: 'Me'
					}}
					onChangeUserMode={this.handleUserModeChange}
					onDropEvent={this.handleDropEvent}
					allUsers={users}
					timezone={location.timezone}
					allEvents={events}
					defaultMinTime="07:00"
					defaultMaxTime="20:00"
					defaultStartTime="09:00"
					defaultEndTime="18:00"
				/>
			</Container>
		)
	}
}

stories.addDecorator(withKnobs)

stories.add('Big Calendar', () => <BigCalendarExample />)
