// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	hours: Array<Object>,
	className?: string
}

const TimeGutter = (props: Props) => {
	return (
		<div className="bigcalendar__time-gutter fill-height">
			{props.hours.map((hour, idx) => {
				return (
					<div className="hour-block">{idx > 0 && <p>{hour.label}</p>}</div>
				)
			})}
		</div>
	)
}

export default TimeGutter
