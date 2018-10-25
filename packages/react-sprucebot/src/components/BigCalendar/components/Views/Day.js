// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import TimeGutter from '../TimeGutter/TimeGutter'

type Props = {
	showRightProps: boolean,
	hours: Array<Object>,
	className?: string
}

const Day = (props: Props) => {
	return (
		<div className="bigcalendar-view__day">
			<div className="bigcalendar-user__header">what?</div>
			<div className="bigcalendar-scroll__wrapper fill-height">
				<TimeGutter hours={props.hours} />
				<div className="column_wrappers">I'm the day view</div>
			</div>
		</div>
	)
}

export default Day
