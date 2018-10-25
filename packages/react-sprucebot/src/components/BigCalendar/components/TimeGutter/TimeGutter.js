// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	hours: Array<Object>,
	className?: string
}

const TimeGutter = (props: Props) => {
	return (
		<div className="bigcalendar-time__gutter fill-height">
			{props.hours.map(hour => {
				return (
					<div className="hour-block">
						<p>{hour.label}</p>
					</div>
				)
			})}
		</div>
	)
}

export default TimeGutter
