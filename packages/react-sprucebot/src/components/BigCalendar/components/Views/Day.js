// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import TimeGutter from '../TimeGutter/TimeGutter'
import TeammateHeader from '../TeammateHeader/TeammateHeader'
import DayCol from './DalCol'

type Props = {
	showRightProps: boolean,
	users: Array<Object>,
	hours: Array<Object>,
	location: Object,
	className?: String,
	minTime: String,
	maxTime: String,
	viewHeight: Number,
	onScroll: Function
}

type State = {
	scrollLeft: Number,
	scrollTop: Number
}

class Day extends Component<Props> {
	state = {
		scrollLeft: 0,
		scrollTop: 0
	}

	handleScroll = e => {
		const target = e.target
		const { scrollTop, scrollLeft } = target
		this.setState({
			scrollTop,
			scrollLeft
		})
	}

	render() {
		const { users, location, hours, viewHeight, minTime, maxTime } = this.props
		const { scrollTop, scrollLeft } = this.state

		return (
			<div className="bigcalendar__view-day">
				<div className="bigcalendar__user-header">
					<TeammateHeader users={users} location={location} />
				</div>
				<div className="bigcalendar__scroll-wrapper">
					<TimeGutter
						hours={hours}
						viewHeight={viewHeight}
						scrollTop={scrollTop}
					/>
					<div
						onScroll={this.handleScroll}
						className="column_wrappers"
						style={{
							height: viewHeight
						}}
					>
						<div className="scroll-inner">
							{users.map(user => (
								<DayCol
									key={`day-col-${user.id}`}
									hours={hours}
									user={user}
									minTime={minTime}
									maxTime={maxTime}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Day
