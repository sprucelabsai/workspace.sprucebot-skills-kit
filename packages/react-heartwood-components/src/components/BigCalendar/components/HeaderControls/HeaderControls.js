// @flow
import React, { Component } from 'react'
import screenfull from 'screenfull'
import isEqual from 'lodash'
import moment from 'moment-timezone'

import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import Pagination from '../../../Pagination/Pagination'
import DatePicker from '../../../Forms/components/DatePicker/DatePicker'

import FullScreenIcon from '../../../../../static/assets/icons/ic_fullscreen.svg'
import FullScreenExitIcon from '../../../../../static/assets/icons/ic_fullscreen_exit.svg'

type Props = {
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	onBackDate: Function,
	onNextDate: Function,
	onChangeView: Function,
	fullScreenNode: Object,
	userModeOptions?: Array<Object>,
	onChangeUserMode?: Function,
	userMode?: string,
	onSelectDate: Function,
	onDateToToday: Function,
	selectedDate: Object,
	isDatePickerShown: boolean
}

type State = {
	isDatePickerShown: boolean,
	isFullScreen: boolean,
	shouldResetDatePicker: boolean
}

class HeaderControls extends Component<Props, State> {
	state = {
		isDatePickerShown: this.props.isDatePickerShown,
		isFullScreen: false,
		selectedDate: this.props.selectedDate,
		shouldResetDatePicker: false
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isDatePickerShown !== this.props.isDatePickerShown) {
			this.setState({ isDatePickerShown: nextProps.isDatePickerShown })
		}
		if (!isEqual(this.props.selectedDate, nextProps.selectedDate)) {
			this.setState({ selectedDate: nextProps.selectedDate })
		}
	}

	toggleDatePicker = () => {
		this.setState({ isDatePickerShown: !this.state.isDatePickerShown })
	}

	onSelectDate = (date: moment) => {
		this.props.onSelectDate && this.props.onSelectDate(date)

		if (!this.props.isDatePickerShown) {
			this.setState({ isDatePickerShown: false })
		}
		this.setState({ selectedDate: date })
	}

	toggleFullScreen = () => {
		screenfull.toggle(this.props.fullScreenNode)
		this.setState({ isFullScreen: !this.state.isFullScreen })
	}

	onSetDateToToday = () => {
		const { onDateToToday } = this.props
		onDateToToday && onDateToToday()
		this.setState(
			prevState => ({
				selectedDate: moment(),
				shouldResetDatePicker: prevState.isDatePickerShown
			}),
			() => {
				this.setState({ shouldResetDatePicker: false })
			}
		)
	}

	render() {
		const {
			onBackDate,
			onNextDate,
			userModeOptions,
			onChangeUserMode,
			userMode
		} = this.props

		const {
			selectedDate,
			isDatePickerShown,
			isFullScreen,
			shouldResetDatePicker
		} = this.state

		return (
			<div className="bigcalendar__header-controls">
				<div className="bigcalendar__date-scroll-controls">
					<Pagination
						isSimple={true}
						onClickNext={onNextDate}
						onClickBack={onBackDate}
						currentPage={1}
						totalPages={3}
					/>
					<Button
						kind={'simple'}
						isSmall={true}
						text={'Today'}
						className="bigcalendar__selectedDate-button"
						onClick={this.onSetDateToToday}
					/>
					<div className="bigcalendar__date-select">
						<Button
							kind={'simple'}
							className="bigcalendar__calendarIcon-button"
							icon={{ name: 'calendar', isLineIcon: true }}
							onClick={() => this.toggleDatePicker()}
						/>
						{isDatePickerShown && !shouldResetDatePicker && (
							<div className="bigcalendar_date-picker">
								<div
									className="bigcalendar_date-picker-underlay"
									onClick={() => this.toggleDatePicker()}
								/>
								<DatePicker
									date={selectedDate}
									onSelectDate={this.onSelectDate}
								/>
							</div>
						)}
					</div>
					{userModeOptions && onChangeUserMode && userMode && (
						<Select
							className="user-mode-select"
							options={userModeOptions}
							onChange={e => {
								onChangeUserMode(e.target.value)
							}}
							value={userMode}
						/>
					)}
				</div>
				<div className="bigcalendar__fullscreen-control">
					{isFullScreen ? (
						<Button
							kind={'simple'}
							icon={{
								customIcon: FullScreenExitIcon,
								isLineIcon: false
							}}
							onClick={() => {
								this.toggleFullScreen()
							}}
						/>
					) : (
						<Button
							kind={'simple'}
							icon={{ customIcon: FullScreenIcon, isLineIcon: false }}
							onClick={() => {
								this.toggleFullScreen()
							}}
						/>
					)}
				</div>
			</div>
		)
	}
}

export default HeaderControls
