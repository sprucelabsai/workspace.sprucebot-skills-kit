// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

import type { ElementRef } from 'react'

type Props = {
	user: Object,
	minTime: string,
	maxTime: string,
	startTime: string,
	endTime: string,
	hours: Array<Object>,
	slotsPerHour: number,
	timezone: string,
	date: moment
}

export default class DayCol extends Component<Props> {
	/** outer most node */
	domNodeRef: { current: null | ElementRef<'div'> }

	handleHover = (/* { x, y }: { x: number, y: number } */) => {}

	render() {
		const {
			startTime,
			endTime,
			timezone,
			slotsPerHour,
			date,
			hours
		} = this.props

		// convert everything to timestamps for easy comparison in lots of loops
		const start = startTime
			? parseInt(
					moment
						.tz(`${date.format('YYYY-MM-DD')} ${startTime}`, timezone)
						.format('X'),
					10
			  )
			: false

		const end = endTime
			? parseInt(
					moment
						.tz(`${date.format('YYYY-MM-DD')} ${endTime}`, timezone)
						.format('X')
			  )
			: false

		let isActive
		let now

		// duration in seconds
		const slotDuration = (60 / slotsPerHour) * 60

		const hourElements = hours.map(hour => {
			now = hour.timestamp
			const slots = []
			for (let c = 0; c < slotsPerHour; c++) {
				isActive = start && end && now >= start && now < end
				slots.push(
					<div
						key={`${hour.hour}-${c}`}
						className={cx('timeslot', {
							active: isActive,
							inactive: !isActive
						})}
					/>
				)
				now += slotDuration
			}

			return (
				<div key={`${hour.timestamp}-daycol`} className={cx('hour-block', {})}>
					{slots}
				</div>
			)
		})

		return (
			<div className="bigcalendar__day-col" ref={this.domNodeRef}>
				{hourElements}
			</div>
		)
	}
}
