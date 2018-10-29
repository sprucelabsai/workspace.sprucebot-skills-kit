// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

type Props = {
	user: Object,
	minTime: String,
	maxTime: String,
	startTime: String,
	endTime: String,
	hours: Array<Object>,
	slotsPerHour: Number,
	timezone: String,
	date: Object
}

const DayCol = (props: Props) => {
	// convert everything to timestamps for easy comparison in lots of loops
	const start = parseInt(
		moment
			.tz(
				`${props.date.format('YYYY-MM-DD')} ${props.startTime}`,
				props.timezone
			)
			.format('X'),
		10
	)
	const end = parseInt(
		moment
			.tz(`${props.date.format('YYYY-MM-DD')} ${props.endTime}`, props.timezone)
			.format('X')
	)
	const secondsPerTimeslot = (1 / props.slotsPerHour) * 60 * 60
	let isActive
	let now

	const hours = props.hours.map(hour => {
		const timeslots = []
		now = hour.timestamp
		isActive = now >= start && now < end

		return (
			<div
				key={hour.label}
				className={cx('hour-block', {
					active: isActive,
					inactive: !isActive
				})}
			>
				{timeslots}
			</div>
		)
	})

	return <div className="bigcalendar__day-col">{hours}</div>
}

export default DayCol
