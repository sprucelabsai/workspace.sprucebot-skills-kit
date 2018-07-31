import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import is from 'is_js'
import HTML5Backend from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
import PropTypes from 'prop-types'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment)) // or globalizeLocalizer

const CalendarComponent = withDragAndDrop(BigCalendar)

const CalendarWrapper = styled.div.attrs({
	className: `calendar__wrapper`
})`
	.rbc-btn {
		color: inherit;
		font: inherit;
		margin: 0;
	}
	button.rbc-btn {
		overflow: visible;
		text-transform: none;
		-webkit-appearance: button;
		cursor: pointer;
	}
	button[disabled].rbc-btn {
		cursor: not-allowed;
	}
	button.rbc-input::-moz-focus-inner {
		border: 0;
		padding: 0;
	}
	.rbc-calendar {
		box-sizing: border-box;
		height: 100%;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-align-items: stretch;
		-ms-flex-align: stretch;
		align-items: stretch;
	}
	.rbc-calendar *,
	.rbc-calendar *:before,
	.rbc-calendar *:after {
		box-sizing: inherit;
	}
	.rbc-abs-full,
	.rbc-row-bg {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.rbc-ellipsis,
	.rbc-event-label,
	.rbc-row-segment .rbc-event-content,
	.rbc-show-more {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rbc-rtl {
		direction: rtl;
	}
	.rbc-off-range {
		color: #999999;
	}
	.rbc-off-range-bg {
		background: #e5e5e5;
	}
	.rbc-header {
		overflow: hidden;
		-webkit-flex: 1 0 0%;
		-ms-flex: 1 0 0%;
		flex: 1 0 0%;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 3px;
		text-align: center;
		vertical-align: middle;
		font-weight: bold;
		font-size: 90%;
		min-height: 0;
		border-bottom: 1px solid #ddd;
	}
	.rbc-header + .rbc-header {
		border-left: 1px solid #ddd;
	}
	.rbc-rtl .rbc-header + .rbc-header {
		border-left-width: 0;
		border-right: 1px solid #ddd;
	}
	.rbc-header > a,
	.rbc-header > a:active,
	.rbc-header > a:visited {
		color: inherit;
		text-decoration: none;
	}
	.rbc-row-content {
		position: relative;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-select: none;
		z-index: 4;
	}
	.rbc-today {
		background-color: #eaf6ff;
	}
	.rbc-toolbar {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		margin-bottom: 10px;
		font-size: 16px;
	}
	.rbc-toolbar .rbc-toolbar-label {
		-webkit-flex-grow: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		padding: 0 10px;
		text-align: center;
	}
	.rbc-toolbar button {
		color: #373a3c;
		display: inline-block;
		margin: 0;
		text-align: center;
		vertical-align: middle;
		background: none;
		background-image: none;
		border: 1px solid #ccc;
		padding: 0.375rem 1rem;
		border-radius: 4px;
		line-height: normal;
		white-space: nowrap;
	}
	.rbc-toolbar button:active,
	.rbc-toolbar button.rbc-active {
		background-image: none;
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		background-color: #e6e6e6;
		border-color: #adadad;
	}
	.rbc-toolbar button:active:hover,
	.rbc-toolbar button.rbc-active:hover,
	.rbc-toolbar button:active:focus,
	.rbc-toolbar button.rbc-active:focus {
		color: #373a3c;
		background-color: #d4d4d4;
		border-color: #8c8c8c;
	}
	.rbc-toolbar button:focus {
		color: #373a3c;
		background-color: #e6e6e6;
		border-color: #adadad;
	}
	.rbc-toolbar button:hover {
		color: #373a3c;
		background-color: #e6e6e6;
		border-color: #adadad;
	}
	.rbc-btn-group {
		display: inline-block;
		white-space: nowrap;
	}
	.rbc-btn-group > button:first-child:not(:last-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.rbc-btn-group > button:last-child:not(:first-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {
		border-radius: 4px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {
		border-radius: 4px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.rbc-btn-group > button:not(:first-child):not(:last-child) {
		border-radius: 0;
	}
	.rbc-btn-group button + button {
		margin-left: -1px;
	}
	.rbc-rtl .rbc-btn-group button + button {
		margin-left: 0;
		margin-right: -1px;
	}
	.rbc-btn-group + .rbc-btn-group,
	.rbc-btn-group + button {
		margin-left: 10px;
	}
	.rbc-event {
		padding: 2px 5px;
		background-color: #3174ad;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
	}
	.rbc-slot-selecting .rbc-event {
		cursor: inherit;
		pointer-events: none;
	}
	.rbc-event.rbc-selected {
		background-color: #265985;
	}
	.rbc-event-label {
		font-size: 80%;
	}
	.rbc-event-overlaps {
		box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);
	}
	.rbc-event-continues-prior {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.rbc-event-continues-after {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.rbc-event-continues-earlier {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.rbc-event-continues-later {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.rbc-event-continues-day-after {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.rbc-event-continues-day-prior {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.rbc-row {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}
	.rbc-row-segment {
		padding: 0 1px 1px 1px;
	}
	.rbc-selected-cell {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.rbc-show-more {
		background-color: rgba(255, 255, 255, 0.3);
		z-index: 4;
		font-weight: bold;
		font-size: 85%;
		height: auto;
		line-height: normal;
		white-space: nowrap;
	}
	.rbc-month-view {
		position: relative;
		border: 1px solid #ddd;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex: 1 0 0;
		-ms-flex: 1 0 0px;
		flex: 1 0 0;
		width: 100%;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-select: none;
		height: 100%;
	}
	.rbc-month-header {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}
	.rbc-month-row {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		position: relative;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex: 1 0 0;
		-ms-flex: 1 0 0px;
		flex: 1 0 0;
		-webkit-flex-basis: 0px;
		-ms-flex-preferred-size: 0px;
		flex-basis: 0px;
		overflow: hidden;
		height: 100%;
	}
	.rbc-month-row + .rbc-month-row {
		border-top: 1px solid #ddd;
	}
	.rbc-date-cell {
		-webkit-flex: 1 1 0;
		-ms-flex: 1 1 0px;
		flex: 1 1 0;
		min-width: 0;
		padding-right: 5px;
		text-align: right;
	}
	.rbc-date-cell.rbc-now {
		font-weight: bold;
	}
	.rbc-date-cell > a,
	.rbc-date-cell > a:active,
	.rbc-date-cell > a:visited {
		color: inherit;
		text-decoration: none;
	}
	.rbc-row-bg {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-flex: 1 0 0;
		-ms-flex: 1 0 0px;
		flex: 1 0 0;
		overflow: hidden;
	}
	.rbc-day-bg {
		-webkit-flex: 1 0 0%;
		-ms-flex: 1 0 0%;
		flex: 1 0 0%;
	}
	.rbc-day-bg + .rbc-day-bg {
		border-left: 1px solid #ddd;
	}
	.rbc-rtl .rbc-day-bg + .rbc-day-bg {
		border-left-width: 0;
		border-right: 1px solid #ddd;
	}
	.rbc-overlay {
		position: absolute;
		z-index: 5;
		border: 1px solid #e5e5e5;
		background-color: #fff;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
		padding: 10px;
	}
	.rbc-overlay > * + * {
		margin-top: 1px;
	}
	.rbc-overlay-header {
		border-bottom: 1px solid #e5e5e5;
		margin: -10px -10px 5px -10px;
		padding: 2px 10px;
	}
	.rbc-agenda-view {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex: 1 0 0;
		-ms-flex: 1 0 0px;
		flex: 1 0 0;
		overflow: auto;
	}
	.rbc-agenda-view table.rbc-agenda-table {
		width: 100%;
		border: 1px solid #ddd;
		border-spacing: 0;
		border-collapse: collapse;
	}
	.rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
		padding: 5px 10px;
		vertical-align: top;
	}
	.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {
		padding-left: 15px;
		padding-right: 15px;
		text-transform: lowercase;
	}
	.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
		border-left: 1px solid #ddd;
	}
	.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
		border-left-width: 0;
		border-right: 1px solid #ddd;
	}
	.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {
		border-top: 1px solid #ddd;
	}
	.rbc-agenda-view table.rbc-agenda-table thead > tr > th {
		padding: 3px 5px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}
	.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
		text-align: right;
	}
	.rbc-agenda-time-cell {
		text-transform: lowercase;
	}
	.rbc-agenda-time-cell .rbc-continues-after:after {
		content: ' »';
	}
	.rbc-agenda-time-cell .rbc-continues-prior:before {
		content: '« ';
	}
	.rbc-agenda-date-cell,
	.rbc-agenda-time-cell {
		white-space: nowrap;
	}
	.rbc-agenda-event-cell {
		width: 100%;
	}
	.rbc-time-column {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		min-height: 100%;
	}
	.rbc-time-column .rbc-timeslot-group {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.rbc-timeslot-group {
		border-bottom: 1px solid #ddd;
		min-height: 40px;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-flow: column nowrap;
		-ms-flex-flow: column nowrap;
		flex-flow: column nowrap;
	}
	.rbc-time-gutter,
	.rbc-header-gutter {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
	}
	.rbc-label {
		padding: 0 5px;
	}
	.rbc-day-slot {
		position: relative;
	}
	.rbc-day-slot .rbc-events-container {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 10px;
		top: 0;
	}
	.rbc-day-slot .rbc-events-container.rbc-is-rtl {
		left: 10px;
		right: 0;
	}
	.rbc-day-slot .rbc-event {
		border: 1px solid #265985;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		max-height: 100%;
		min-height: 20px;
		-webkit-flex-flow: column wrap;
		-ms-flex-flow: column wrap;
		flex-flow: column wrap;
		-webkit-align-items: flex-start;
		-ms-flex-align: start;
		align-items: flex-start;
		overflow: hidden;
		position: absolute;
	}
	.rbc-day-slot .rbc-event-label {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
		padding-right: 5px;
		width: auto;
	}
	.rbc-day-slot .rbc-event-content {
		width: 100%;
		-webkit-flex: 1 1 0;
		-ms-flex: 1 1 0px;
		flex: 1 1 0;
		word-wrap: break-word;
		line-height: 1;
		height: 100%;
		min-height: 1em;
	}
	.rbc-day-slot .rbc-time-slot {
		border-top: 1px solid #f7f7f7;
	}
	.rbc-time-slot {
		-webkit-flex: 1 0 0;
		-ms-flex: 1 0 0px;
		flex: 1 0 0;
	}
	.rbc-time-slot.rbc-now {
		font-weight: bold;
	}
	.rbc-day-header {
		text-align: center;
	}
	.rbc-slot-selection {
		z-index: 10;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 75%;
		width: 100%;
		padding: 3px;
	}
	.rbc-slot-selecting {
		cursor: move;
	}
	.rbc-time-view {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 100%;
		border: 1px solid #ddd;
		min-height: 0;
	}
	.rbc-time-view .rbc-time-gutter {
		white-space: nowrap;
	}
	.rbc-time-view .rbc-allday-cell {
		box-sizing: content-box;
		width: 100%;
		position: relative;
	}
	.rbc-time-view .rbc-allday-events {
		position: relative;
		z-index: 4;
	}
	.rbc-time-view .rbc-row {
		box-sizing: border-box;
		min-height: 20px;
	}
	.rbc-time-header {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}
	.rbc-time-header.rbc-overflowing {
		border-right: 1px solid #ddd;
	}
	.rbc-rtl .rbc-time-header.rbc-overflowing {
		border-right-width: 0;
		border-left: 1px solid #ddd;
	}
	.rbc-time-header > .rbc-row:first-child {
		border-bottom: 1px solid #ddd;
	}
	.rbc-time-header > .rbc-row.rbc-row-resource {
		border-bottom: 1px solid #ddd;
	}
	.rbc-time-header-content {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		min-width: 0;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		border-left: 1px solid #ddd;
	}
	.rbc-rtl .rbc-time-header-content {
		border-left-width: 0;
		border-right: 1px solid #ddd;
	}
	.rbc-time-content {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex: 1 0 0%;
		-ms-flex: 1 0 0%;
		flex: 1 0 0%;
		-webkit-align-items: flex-start;
		-ms-flex-align: start;
		align-items: flex-start;
		width: 100%;
		border-top: 2px solid #ddd;
		overflow-y: auto;
		position: relative;
	}
	.rbc-time-content > .rbc-time-gutter {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
	}
	.rbc-time-content > * + * > * {
		border-left: 1px solid #ddd;
	}
	.rbc-rtl .rbc-time-content > * + * > * {
		border-left-width: 0;
		border-right: 1px solid #ddd;
	}
	.rbc-time-content > .rbc-day-slot {
		width: 100%;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-user-select: none;
	}
	.rbc-current-time-indicator {
		position: absolute;
		z-index: 3;
		height: 1px;
		background-color: #74ad31;
		pointer-events: none;
	}
	.rbc-addons-dnd .rbc-row-content {
		pointer-events: none;
	}
	.rbc-addons-dnd .rbc-row-content .rbc-show-more,
	.rbc-addons-dnd .rbc-row-content .rbc-event {
		pointer-events: all;
	}
	.rbc-addons-dnd .rbc-addons-dnd-over {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.rbc-addons-dnd .rbc-events-container {
		pointer-events: none;
	}
	.rbc-addons-dnd .rbc-event {
		transition: opacity 150ms;
		pointer-events: all;
	}
	.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ns-icon,
	.rbc-addons-dnd .rbc-event:hover .rbc-addons-dnd-resize-ew-icon {
		display: block;
	}
	.rbc-addons-dnd.rbc-addons-dnd-is-dragging .rbc-event {
		pointer-events: none;
		opacity: 0.5;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resizable {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor {
		width: 100%;
		text-align: center;
		position: absolute;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:first-child {
		top: 0;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ns-anchor:last-child {
		bottom: 0;
	}
	.rbc-addons-dnd
		.rbc-addons-dnd-resize-ns-anchor
		.rbc-addons-dnd-resize-ns-icon {
		display: none;
		border-top: 3px double;
		margin: 0 auto;
		width: 10px;
		cursor: ns-resize;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor {
		position: absolute;
		top: 4px;
		bottom: 0;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:first-child {
		left: 0;
	}
	.rbc-addons-dnd .rbc-addons-dnd-resize-ew-anchor:last-child {
		right: 0;
	}
	.rbc-addons-dnd
		.rbc-addons-dnd-resize-ew-anchor
		.rbc-addons-dnd-resize-ew-icon {
		display: none;
		border-left: 3px double;
		margin-top: auto;
		margin-bottom: auto;
		height: 10px;
		cursor: ew-resize;
	}
`

class Calendar extends Component {
	state = {}

	onNavigate = e => {
		// Not fired with current build but causes error if omitted
		console.log('onNavigate', e)
	}

	startAccessor = event => {
		const start = moment(`${event.date} ${event.startTime}`)
		return start.toDate()
	}

	endAccessor = event => {
		const end = moment(`${event.date} ${event.endTime}`)
		return end.toDate()
	}

	render() {
		const {
			defaultDate = new Date(),
			canDrag,
			canResize,
			...props
		} = this.props

		return (
			<CalendarWrapper>
				<CalendarComponent
					draggableAccessor={canDrag}
					resizableAccessor={canResize}
					startAccessor={this.startAccessor}
					endAccessor={this.endAccessor}
					defaultDate={defaultDate}
					{...props}
				/>
			</CalendarWrapper>
		)
	}
}

const backend =
	is.mobile() || is.tablet() || is.touchDevice() ? TouchBackend : HTML5Backend

export default DragDropContext(backend)(Calendar)

Calendar.propTypes = {
	canDrag: PropTypes.func,
	canResize: PropTypes.func
}
