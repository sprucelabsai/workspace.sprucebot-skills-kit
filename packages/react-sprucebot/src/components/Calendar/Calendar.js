import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import HTML5Backend from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
import PropTypes from 'prop-types'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment)) // or globalizeLocalizer

const CalendarComponent = withDragAndDrop(BigCalendar)

const CalendarWrapper = styled.div.attrs({
	className: `rbc-calendar-wrapper`
})`
	height: ${props => props.height};
	${props =>
		props.defaultView === 'week' && `position: absolute; width: 1000px;`};
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
		min-width: 300px;
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
		background-color: #fafafa;
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
		flex-wrap: wrap;
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
		width: auto;
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
		background-color: #dbeff3;
		color: #4cadc1;
		cursor: pointer;
	}
	.rbc-slot-selecting .rbc-event {
		cursor: inherit;
		pointer-events: none;
	}
	.rbc-event.rbc-selected {
		background-color: #1baac5;
		color: #fff;
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
		border-bottom: 1px solid #b2b3b7;
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
		right: 0;
		top: 0;
	}
	.rbc-day-slot .rbc-events-container.rbc-is-rtl {
		left: 10px;
		right: 0;
	}
	.rbc-day-slot .rbc-event {
		border: 1px solid #fff;
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
		width: inherit;
	}
	.rbc-day-slot .rbc-event-content {
		width: 100%;
		-webkit-flex: 1 1 0;
		-ms-flex: 1 1 0px;
		flex: 1 1 0;
		word-wrap: break-word;
		line-height: 1;
		font-weight: 600;
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
		height: 100%;
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
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}
	.rbc-time-header-gutter:before {
		font-size: 0.8em;
		content: 'All day';
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
		z-index: 999;
		height: 1px;
		background-color: #f85a3e;
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
		color: red;
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
		border-top: 4px double;
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
	/*White Label*/
	.rbc-time-header-cell {
		${props => props.defaultView === 'day' && `display: none`};
	}
	.rbc-time-gutter {
		${props =>
			props.multiCalendarOrder &&
			props.multiCalendarOrder !== 0 &&
			`
			width: 0px;
			color: rgba(0,0,0,0);
			.rbc-label {
				padding: 0;
			}
			`};
	}
	.rbc-time-header-gutter {
		${props =>
			props.multiCalendarOrder &&
			props.multiCalendarOrder !== 0 &&
			`
			display: none;
			`};
	}
	.rbc-current-time-indicator {
		height: 2px;
		background-color: #f85a3e;
	}
	.rbc-today {
		background-color: rgba(96, 180, 199, 0.1);
		color: #00aac7;
	}
	.rbc-event__shift-day,
	.rbc-event__shift-week {
		left: 0% !important;
		width: 85% !important;
		border: none !important;
		border-radius: 5px;
		background-color: #dbeff3;
		color: #4cadc1;
		z-index: 1 !important;
	}
	.rbc-event__shift-day.rbc-event-teammate,
	.rbc-event__shift-week.rbc-event-teammate {
		pointer-events: none !important;
	}
	.rbc-event__break-day,
	.rbc-event__break-week {
		left: 30% !important;
		width: 70% !important;
		border: none !important;
		border-radius: 5px;
		background-color: #c8dadd;
		color: #387e8d;
		z-index: 2 !important;
	}
	.rbc-event__block-day,
	.rbc-event__block-week {
		left: 15% !important;
		width: 75% !important;
		border: none !important;
		border-radius: 5px;
		background-color: #949494;
		color: #0e2024;
		z-index: 3 !important;
	}
	.rbc-event__off-hours-day,
	.rbc-event__off-hours-week,
	.rbc-event__closed-day,
	.rbc-event__closed-week {
		left: 0 !important;
		right: 0 !important;
		width: 100% !important;
		border: none !important;
		color: rgba(0, 0, 0, 0);
		background-color: rgba(66, 96, 126, 0.1);
		pointer-events: none !important;
	}
	.rbc-selected {
		z-index: 5 !important;
	}
	${props =>
		props.customView === 'team-week' &&
		`
			position: relative;
			width: 2000px;
			.rbc-time-content {
				flex-direction: row;
			}
			.rbc-time-gutter,
			.rbc-current-time-indicator,
			.rbc-time-header-gutter,
			.rbc-allday-cell,
			.rbc-event-allday,
			.rbc-event__break-week,
			.rbc-event__off-hours-week {
				display: none !important;
			}
			.rbc-timeslot-group {
				width: 0.5em;
				height: 0.5em;
				border: none;
				color: rgba(0, 0, 0, 0);
			}
			.rbc-day-slot {
				height: 101px !important;
			}
			.rbc-event__closed-week,
			.rbc-event__shift-week {
				top: 0 !important;
				bottom: 0 !important;
				width: intial !important;
				height: 101px !important;
			}
			.rbc-time-header-content {
				${props =>
					props.multiCalendarOrder &&
					props.multiCalendarOrder !== 0 &&
					`
					display: none;
					`};
			}
		`};
`

class Calendar extends Component {
	state = {}

	onNavigate = e => {
		// Not fired with current build but causes error if omitted
		console.log('onNavigate', e)
	}

	render() {
		const {
			height,
			defaultView,
			date,
			views,
			events,
			step,
			timeslots,
			min,
			max,
			formats,
			toolbar,
			titleAccessor,
			startAccessor,
			endAccessor,
			allDayAccessor,
			selectable,
			eventPropGetter,
			onSelectEvent,
			onSelectSlot,
			onEventDrop,
			onEventResize,
			multiCalendarOrder,
			customView
		} = this.props

		console.log({ multiCalendarOrder })

		return (
			<CalendarWrapper
				height={height}
				defaultView={defaultView}
				multiCalendarOrder={multiCalendarOrder}
				customView={customView}
			>
				<CalendarComponent
					date={date || new Date()}
					defaultView={defaultView}
					views={views}
					events={events}
					step={step}
					timeslots={timeslots}
					min={min}
					max={max}
					formats={formats}
					toolbar={toolbar}
					titleAccessor={titleAccessor}
					startAccessor={startAccessor}
					endAccessor={endAccessor}
					allDayAccessor={allDayAccessor}
					selectable={selectable}
					eventPropGetter={eventPropGetter}
					onNavigate={this.onNavigate}
					onSelectEvent={onSelectEvent}
					onSelectSlot={onSelectSlot}
					onEventDrop={onEventDrop}
					onEventResize={onEventResize}
				/>
			</CalendarWrapper>
		)
	}
}

export default DragDropContext(HTML5Backend)(Calendar)

Calendar.propTypes = {
	height: PropTypes.string,
	date: PropTypes.instanceOf(Date),
	toolbar: PropTypes.bool,
	events: PropTypes.array,
	defaultView: PropTypes.string,
	views: PropTypes.array,
	selectable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	step: PropTypes.number,
	timeslots: PropTypes.number,
	min: PropTypes.instanceOf(Date),
	max: PropTypes.instanceOf(Date),
	onSelectSlot: PropTypes.func,
	onSelectEvent: PropTypes.func,
	formats: PropTypes.object,
	titleAccessor: PropTypes.string,
	startAccessor: PropTypes.string,
	endAccessor: PropTypes.string,
	allDayAccessor: PropTypes.string,
	dragAndDrop: PropTypes.bool,
	eventPropGetter: PropTypes.func
}
