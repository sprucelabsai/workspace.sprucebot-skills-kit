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
	date: Object
}

export default class DayCol extends Component<Props> {
	domNodeRef: { current: null | ElementRef<'div'> }

	handleHover = ({ x, y }: { x: number, y: number }) => {}

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

		const hourElements = hours.map(hour => {
			now = hour.timestamp
			isActive = start && end && now >= start && now < end

			const slots = []
			for (let c = 0; c < slotsPerHour; c++) {
				slots.push(<div key={`${hour.hour}-${c}`} className={'timeslot'} />)
			}

			return (
				<div
					key={`${hour.timestamp}-daycol`}
					className={cx('hour-block', {
						active: isActive,
						inactive: !isActive
					})}
				>
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
