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
	state = {}

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
		const {
			defaultDate = new Date(),
			canDrag,
			canResize,
			...props
		} = this.props

		return (
			<div {...props} className={`calendar__wrapper`}>
				<CalendarComponent
					onNavigate={this.onNavigate}
					draggableAccessor={canDrag}
					resizableAccessor={canResize}
					startAccessor={this.startAccessor}
					endAccessor={this.endAccessor}
					defaultDate={defaultDate}
					selectable={props.onSelectSlot ? true : ''}
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
