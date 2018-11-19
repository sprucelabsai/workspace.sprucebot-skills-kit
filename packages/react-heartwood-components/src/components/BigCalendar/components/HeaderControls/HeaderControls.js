// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import screenfull from 'screenfull'

import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import Pagination from '../../../Pagination/Pagination'
import DatePicker from '../../../Forms/components/DatePicker/DatePicker'

import FullScreenIcon from '../../../../../static/assets/icons/ic_fullscreen.svg'
import FullScreenExitIcon from '../../../../../static/assets/icons/ic_fullscreen_exit.svg'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps,
	onBackDate: Function,
	onNextDate: Function,
	onChangeView: Function,
	fullScreenNode: Object,
	userModeSelectOptions?: Array<Object>,
	onChangeUserMode?: Function,
	userMode?: String,
	onSelectDate: Function,
	onDateToToday: Function,
	selectedDate: Object
}

type State = {
	isDatePickerShown: boolean,
	isFullScreen: boolean
}

class HeaderControls extends Component<Props, State> {
	state = {
		isDatePickerShown: false,
		isFullScreen: false
	}

	toggleDatePicker = () => {
		this.setState({ isDatePickerShown: !this.state.isDatePickerShown })
	}

	onSelectDate = date => {
		this.props.onSelectDate && this.props.onSelectDate(date)

		this.setState({ isDatePickerShown: false })
	}

	toggleFullScreen = () => {
		screenfull.toggle(this.props.fullScreenNode)
		this.setState({ isFullScreen: !this.state.isFullScreen })
	}

	render() {
		const {
			onBackDate,
			onNextDate,
			onDateToToday,
			userModeSelectOptions,
			onChangeUserMode,
			userMode,
			selectedDate
		} = this.props

		const { isDatePickerShown, isFullScreen } = this.state

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
						onClick={() => onDateToToday()}
					/>
					<div className="bigcalendar__date-select">
						<Button
							kind={'simple'}
							className="bigcalendar__calendarIcon-button"
							icon={{ name: 'date', isLineIcon: true }}
							onClick={() => this.toggleDatePicker()}
						/>
						{isDatePickerShown && (
							<div className="bigcalendar_date-picker">
								<DatePicker
									date={selectedDate}
									onSelectDate={this.onSelectDate}
								/>
							</div>
						)}
					</div>
					{userModeSelectOptions && onChangeUserMode && userMode && (
						<Select
							className="user-mode-select"
							options={userModeSelectOptions}
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
