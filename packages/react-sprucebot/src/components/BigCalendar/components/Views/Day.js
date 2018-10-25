// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import TimeGutter from '../TimeGutter/TimeGutter'
import TeammateHeader from '../TeammateHeader/TeammateHeader'
import DayCol from './DayCol'
import sizeUtils from '../../utils/size'

type Props = {
	showRightProps: boolean,
	users: Array<Object>,
	hours: Array<Object>,
	location: Object,
	className?: String,
	minTime: String,
	maxTime: String,
	viewHeight: Number,
	onScroll: Function
}

type State = {
	scrollLeft: Number,
	scrollTop: Number
}

class Day extends Component<Props> {
	state = {
		scrollLeft: 0,
		scrollTop: 0
	}
	constructor(props) {
		super(props)
		this.scrollWrapperRef = React.createRef()
	}
	handleScroll = e => {
		const target = e.target
		const { scrollTop, scrollLeft } = target
		this.setState({
			scrollTop,
			scrollLeft
		})
	}

	handleTeammateScroll = e => {
		const target = e.target
		const { scrollLeft: teammateLeft } = target
		const { scrollLeft: viewLeft } = this.state

		if (teammateLeft !== viewLeft) {
			this.scrollWrapperRef.current.scrollLeft = teammateLeft
		}
	}

	handleMouseDown = e => {
		const { clientX, clientY } = e

		this.dragOffset = {
			startingScrollLeft: this.state.scrollLeft,
			startingScrollTop: this.state.scrollTop,
			startingClientX: clientX,
			startingClientY: clientY
		}
		e.preventDefault()
		window.addEventListener('mousemove', this.handleMouseDragOfView)
		window.addEventListener('mouseup', this.handleMouseUp)
	}

	handleMouseUp = e => {
		window.removeEventListener('mousemove', this.handleMouseDragOfView)
		window.removeEventListener('mouseup', this.handleMouseUp)
	}

	handleMouseDragOfView = e => {
		const { clientX, clientY } = e
		const {
			startingClientX,
			startingClientY,
			startingScrollLeft,
			startingScrollTop
		} = this.dragOffset
		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		this.scrollWrapperRef.current.scrollLeft = startingScrollLeft - deltaLeft
		this.scrollWrapperRef.current.scrollTop = startingScrollTop - deltaTop
	}

	render() {
		const { users, location, hours, viewHeight, minTime, maxTime } = this.props
		const { scrollTop, scrollLeft } = this.state

		return (
			<div className="bigcalendar__view-day">
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onScroll={this.handleTeammateScroll}
						scrollLeft={scrollLeft}
						users={users}
						location={location}
					/>
				</div>
				<div className="bigcalendar__body-wrapper">
					<TimeGutter
						hours={hours}
						viewHeight={viewHeight}
						scrollTop={scrollTop}
					/>
					<div
						onMouseDown={this.handleMouseDown}
						onScroll={this.handleScroll}
						ref={this.scrollWrapperRef}
						className="bigcalendar__scroll-wrapper"
						style={{
							height: viewHeight
						}}
					>
						<div className="scroll-inner">
							{users.map(user => (
								<DayCol
									key={`day-col-${user.id}`}
									hours={hours}
									user={user}
									minTime={minTime}
									maxTime={maxTime}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Day
