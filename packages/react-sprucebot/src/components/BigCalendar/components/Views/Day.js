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
	maxTime: String
}

const Day = (props: Props) => {
	return (
		<div className="bigcalendar__view-day">
			<div className="bigcalendar__user-header">
				<TeammateHeader users={props.users} location={props.location} />
			</div>
			<div className="bigcalendar__scroll-wrapper fill-height">
				<TimeGutter hours={props.hours} />
				<div className="column_wrappers">
					{props.users.map(user => (
						<DayCol
							hours={props.hours}
							user={props.user}
							minTime={props.minTime}
							maxTime={props.maxTime}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Day
