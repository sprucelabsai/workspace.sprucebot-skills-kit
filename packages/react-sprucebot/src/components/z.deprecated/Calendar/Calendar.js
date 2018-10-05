import React, { Component } from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import is from 'is_js'
import HTML5Backend from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
import PropTypes from 'prop-types'
import { EventEmitter } from 'events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment)) // or globalizeLocalizer

const CalendarComponent = withDragAndDrop(BigCalendar)

class Calendar extends Component {
	state = {
		today: null
	}

	componentDidMount() {
		const { currentDate } = this.props

		this.setState({ today: moment(currentDate).toDate() })
	}

	onNavigate = e => {
		// Not fired with current build but causes error if omitted
		console.log('onNavigate', e)
	}

	startAccessor = event => {
		return moment(event.start).toDate()
	}

	endAccessor = event => {
		return moment(event.end).toDate()
	}

	render() {
		const { today } = this.state
		const { currentDate, canDrag, canResize, min, max, ...props } = this.props

		const formattedDate = moment(currentDate).toDate()
		const formattedMin = moment(min).toDate()
		const formattedMax = moment(max).toDate()

		return (
			<div {...props} className={`calendar__wrapper`}>
				<CalendarComponent
					onNavigate={this.onNavigate}
					draggableAccessor={canDrag}
					resizableAccessor={canResize}
					startAccessor={this.startAccessor}
					endAccessor={this.endAccessor}
					defaultDate={today}
					date={formattedDate}
					getNow={() => today}
					selectable={props.onSelectSlot ? true : ''}
					min={formattedMin}
					max={formattedMax}
					{...props}
				/>
			</div>
		)
	}
}

const backend =
	is.mobile() || is.tablet() || is.touchDevice() ? TouchBackend : HTML5Backend

export default DragDropContext(backend)(Calendar)

Calendar.propTypes = {
	canDrag: PropTypes.func,
	canResize: PropTypes.func,
	onSelectSlot: PropTypes.func,
	titleAccessor: PropTypes.func
}
