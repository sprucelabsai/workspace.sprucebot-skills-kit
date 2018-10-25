// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import VIEWS from './components/Views'
import moment from 'moment-timezone'
import memoize from 'memoize-one'
import sizeUtils from './utils/size'

// sub components
import Header from './components/Header/Header'

type Props = {
	defaultView: 'day' | 'week' | 'month',
	defaultDate: Object,
	slotsPerHour: Number,
	defaultMinTime: String,
	defaultMaxTime: String,
	allUsers: Array<Object>,
	headerDateFormat: String,
	location: Object
}
type State = {
	selectedView: 'day' | 'week' | 'month',
	minTime: String,
	maxTime: String,
	startDate: Object,
	currentUsers: Array<Object>
}

class BigCalendar extends Component<Props, State> {
	static defaultProps = {
		defaultView: 'day',
		slotsPerHour: 4, // every 15 minutes
		defaultMinTime: '00:00',
		defaultMaxTime: '23:59',
		headerDateFormat: 'MMMM YYYY'
	}
	state = {
		selectedView: this.props.defaultView,
		minTime: this.props.defaultMinTime,
		maxTime: this.props.defaultMaxTime,
		startDate:
			this.props.startDate ||
			moment.tz(new Date(), this.props.location.timezone),
		currentUsers: this.props.allUsers,
		bodyWidth: sizeUtils.bodyWidth(),
		bodyHeight: sizeUtils.bodyHeight(),
		viewHeight: 0
	}

	constructor(props) {
		super(props)
		this.domNode = React.createRef()
	}

	componentDidMount = () => {
		window.addEventListener('resize', this.handleSizing)
		this.handleSizing()
		setTimeout(this.handleSizing, 1000)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.handleSizing)
	}

	handleSizing = () => {
		//get node for scroll wrapper
		const scrollNode = this.domNode.current.querySelectorAll(
			'.bigcalendar__scroll-wrapper'
		)[0]

		// calc positions
		const scrollTop = sizeUtils.getTop(scrollNode)
		const width = sizeUtils.bodyWidth()
		const height = sizeUtils.bodyHeight()
		const viewHeight = height - scrollTop

		this.setState({
			bodyWidth: width,
			bodyHeight: height,
			viewHeight
		})
	}

	handleChangeView = view => {
		console.log('change view!')
	}

	handleBackDate = () => {
		const [amount, unit] = this.getViewDetails().pageAmount
		const nextDate = moment(this.state.startDate).subtract(amount, unit)

		this.setState({
			startDate: nextDate
		})
	}
	handleNextDate = () => {
		const [amount, unit] = this.getViewDetails().pageAmount
		const nextDate = moment(this.state.startDate).add(amount, unit)

		this.setState({
			startDate: nextDate
		})
	}

	/**
	 * Store current state in cookie to restore calendar later
	 */
	preserveState = () => {}

	getViewDetails = (view?: String) => {
		const v = view || this.state.selectedView
		return VIEWS[v]
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
		const { className, headerDateFormat, location } = this.props
		const {
			selectedView,
			minTime,
			maxTime,
			startDate,
			currentUsers,
			bodyWidth,
			bodyHeight,
			viewHeight
		} = this.state

		const parentClass = cx('bigcalendar', className, {})
		const hours = this.generateTimeGutterHours(minTime, maxTime)

		// load the view
		const View = this.getViewDetails().View

		return (
			<div
				className={parentClass}
				ref={this.domNode}
				style={{
					width: bodyWidth,
					height: bodyHeight
				}}
			>
				<Header
					dateFormat={headerDateFormat}
					selectedDate={startDate}
					selectedView={selectedView}
					onChangeView={this.handleChangeView}
					onBackDate={this.handleBackDate}
					onNextDate={this.handleNextDate}
				/>
				<div className="bigcalendar__view-wrapper">
					<View
						onScroll={this.handleViewScroll}
						viewHeight={viewHeight}
						hours={hours}
						users={currentUsers}
						location={location}
						minTime={minTime}
						maxTime={maxTime}
					/>
				</div>
			</div>
		)
	}
}

export default BigCalendar
