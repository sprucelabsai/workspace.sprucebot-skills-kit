import React, { Component } from 'react'
import moment from 'moment'

export default class TeamWeek extends Component {
	static title(date) {
		return 'TEST'
	}

	static navigate(date) {
		console.log('TEAM WEEK', date)
	}

	handleOnClick = (event, e) => {
		const { onSelectEvent } = this.props

		onSelectEvent && onSelectEvent(event, e)
	}

	renderDayEvents = (events, date) => {
		const { max, min } = this.props

		return events
			.filter(event => moment(event.start).isSame(moment(date), 'day'))
			.map((event, index) => {
				const { start, end } = event

				const totalMinutes = moment(max).diff(moment(min), 'minutes')

				const startOfDay = moment(
					`${date.format('YYYY-MM-DD')} ${moment(min).format('HH:mm:ss')}`
				)

				const endOfDay = moment(
					`${date.format('YYYY-MM-DD')} ${moment(max).format('HH:mm:ss')}`
				)

				const left = Math.round(
					(moment(start).diff(startOfDay, 'minutes') / totalMinutes) * 100
				)
				const right = Math.round(
					(moment(endOfDay).diff(end, 'minutes') / totalMinutes) * 100
				)

				return (
					<div
						key={`${event.userId}_${event.start}`}
						onClick={e => this.handleOnClick(event, e)}
						className={`rbc-event event-${index} ${event.className || ''}`}
						style={{
							left: `${left}%`,
							right: `${right}%`
						}}
					>
						{event.title}
					</div>
				)
			})
	}

	render() {
		const { className = '', date, dayFormat, events } = this.props

		const currentDate = moment(date).startOf('week')
		const end = moment(currentDate).endOf('week')

		const dates = []

		do {
			dates.push(moment(currentDate))
			currentDate.add(1, 'day')
		} while (currentDate <= end)

		return (
			<div className={`team_week ${className}`}>
				<div className="rbc-time-header">
					<div className="rbc-row rbc-time-header-cell">
						{dates.map(date => {
							return (
								<div key={`header-for-${date.format()}`} className="rbc-header">
									{date.format(dayFormat)}
								</div>
							)
						})}
					</div>
				</div>
				<div className="rbc-time-content">
					<div className="rbc-row rbc-time-content-cell">
						{dates.map(date => {
							return (
								<div
									key={`content-for-${date.format()}`}
									className={`rbc-day-slot rbc-day-column`}
								>
									<div className="rbc-allday-cell">
										{events
											.filter(
												event =>
													event.allDay &&
													moment(event.start).isSame(moment(date), 'day')
											)
											.map(event => {
												return (
													<div
														key={`${event.title}_${event.start}`}
														className={`rbc-event ${event.className || ''}`}
														onClick={e => this.handleOnClick(event, e)}
													>
														{event.title}
													</div>
												)
											})}
									</div>
									<div className="rbc-events-wrapper">
										{this.renderDayEvents(events, date)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}
