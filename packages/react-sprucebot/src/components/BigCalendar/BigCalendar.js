// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import VIEWS from './components/Views'
import moment from 'moment-timezone'
import memoize from 'memoize-one'

// sub components
import Header from './components/Header/Header'

type Props = {
	defaultView: 'day' | 'week' | 'month',
	slotsPerHour: Number,
	defaultMinTime: String,
	defaultMaxTime: String,
	timezone: String
}
type State = {
	selectedView: 'day' | 'week' | 'month'
}

class BigCalendar extends Component<Props, State> {
	static defaultProps = {
		defaultView: 'day',
		slotsPerHour: 4, // every 15 minutes
		defaultMinTime: '00:00',
		defaultMaxTime: '23:59',
		timezone: 'America/Denver'
	}
	state = {
		selectedView: this.props.defaultView,
		minTime: this.props.defaultMinTime,
		maxTime: this.props.defaultMaxTime
	}

	handleChangeView = view => {
		console.log('change view!')
	}

	generateTimeGutterHours = memoize((min, max) => {
		const times = []

		const current = moment(`2018-01-01 ${min}:00`)
		const end = moment(`2018-01-01 ${max}:00`)

		do {
			times.push({
				label: current.format('ha'),
				date: current.toDate()
			})

			current.add(1, 'hours')
		} while (current.toDate() <= end.toDate())

		return times
	})

	render() {
		const { className } = this.props
		const { selectedView, minTime, maxTime } = this.state

		const parentClass = cx('bigcalendar', className, {})
		const hours = this.generateTimeGutterHours(minTime, maxTime)

		// load the view
		const View = VIEWS[selectedView]

		return (
			<div className={parentClass}>
				<Header
					selectedView={selectedView}
					onChangeView={this.handleChangeView}
				/>
				<div className="bigcalendar-view__wrapper">
					<View hours={hours} />
				</div>
			</div>
		)
	}
}

export default BigCalendar
