// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	user: Object,
	minTime: String,
	maxTime: String,
	hours: Array<Object>
}

const DayCol = (props: Props) => {
	return (
		<div className="bigcalendar__day-col">
			{props.hours.map((hour, idx) => {
				return (
					<div
						className="hour-block"
						key={`bigcalendar-${hour}-block-${idx}`}
					/>
				)
			})}
		</div>
	)
}

export default DayCol
