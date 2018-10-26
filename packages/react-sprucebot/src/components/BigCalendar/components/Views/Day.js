// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { Easing, Tween, autoPlay } from 'es6-tween'
autoPlay(true)

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
	startTime: String,
	endTime: String,
	viewHeight: Number,
	onScroll: Function,
	slotsPerHour: Number,
	onUpdateHorizontalPagerDetails: Function
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
		this.scrollInnerRef = React.createRef()
	}

	componentDidMount = () => {
		this.updateHorizontalPagerDetails()
		//TODO better way to detect everything is rendered and sized correctly
		window.addEventListener('resize', this.updateHorizontalPagerDetails)
		setTimeout(this.updateHorizontalPagerDetails, 1000)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateHorizontalPagerDetails)
	}

	handleScroll = e => {
		const target = e.target
		const { scrollTop, scrollLeft } = target
		this.setState({
			scrollTop,
			scrollLeft
		})

		this.updateHorizontalPagerDetails()
	}

	updateHorizontalPagerDetails = () => {
		const { onUpdateHorizontalPagerDetails } = this.props

		let currentPage
		let totalPages = 3
		const scrolledRight = sizeUtils.isScrolledAllTheWayRight(
			this.scrollWrapperRef.current
		)
		const scrolledLeft = sizeUtils.isScrolledAllTheWayLeft(
			this.scrollWrapperRef.current
		)

		if (scrolledRight && scrolledLeft) {
			currentPage = 0
			totalPages = 1
		} else if (scrolledRight) {
			currentPage = 2
		} else if (scrolledLeft) {
			currentPage = 0
		} else {
			currentPage = 1
		}

		onUpdateHorizontalPagerDetails({ currentPage, totalPages })
	}

	//invoked directly by BigCalendar
	handleHorizontalPageNext = () => {
		const { scrollLeft } = this.state
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)
		this.animateHorizontalTo(scrollLeft + pageWidth)
	}

	handleHorizontalPageBack = () => {
		const { scrollLeft } = this.state
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)
		this.animateHorizontalTo(scrollLeft - pageWidth)
	}

	animateHorizontalTo = left => {
		const { scrollLeft } = this.state
		const node = this.scrollWrapperRef.current
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)

		this._activeTween = new Tween({
			scrollLeft
		})
			.to({ scrollLeft: left }, 500)
			.easing(Easing.Quintic.Out)
			.on('update', ({ scrollLeft }) => {
				node.scrollLeft = scrollLeft
			})

		this._activeTween.start()
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
		const {
			users,
			location,
			hours,
			viewHeight,
			minTime,
			maxTime,
			slotsPerHour,
			startTime,
			endTime
		} = this.props

		const { scrollTop, scrollLeft } = this.state

		return (
			<div className="bigcalendar__view-day">
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onMouseDown={this.handleMouseDown}
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
						<div className="scroll-inner" ref={this.scrollInnerRef}>
							{users.map(user => (
								<DayCol
									slotsPerHour={slotsPerHour}
									key={`day-col-${user.id}`}
									hours={hours}
									user={user}
									startTime={startTime}
									endTime={endTime}
									minTime={minTime}
									maxTime={maxTime}
									timezone={location.timezone}
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
