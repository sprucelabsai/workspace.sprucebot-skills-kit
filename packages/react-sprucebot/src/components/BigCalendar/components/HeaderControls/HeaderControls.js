// @flow
import React, { Component } from 'react'
import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import Icon from '../../../Icon/Icon'
import Pagination from '../../../Pagination/Pagination'
import cx from 'classnames'
import screenfull from 'screenfull'
import moment from 'moment-timezone'
import DatePicker from '../../../Forms/components/DatePicker/DatePicker'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps,
	onBackDate: Function,
	onNextDate: Function,
	onChangeView: Function,
	fullScreenNodeRef: Object,
	userModeOptions: Array<Object>,
	onChangeUserMode: Function,
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
		screenfull.toggle(this.props.fullScreenNodeRef.current)
		this.setState({ isFullScreen: !this.state.isFullScreen })
	}

	render() {
		const {
			onBackDate,
			onNextDate,
			onDateToToday,
			userModeOptions,
			onChangeUserMode,
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
							kind="simple"
							className="bigcalendar__calendarIcon-button"
							icon={<Icon icon="date" className="btn__line-icon" />}
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
					{userModeOptions &&
						onChangeUserMode && (
							<Select options={userModeOptions} onChange={onChangeUserMode} />
						)}
				</div>
				<div className="bigcalendar__fullscreen-control">
					{isFullScreen ? (
						<Button
							kind="simple"
							icon={<Icon icon="fullscreen_exit" isLineIcon={false} />}
							onClick={() => {
								this.toggleFullScreen()
							}}
						/>
					) : (
						<Button
							kind="simple"
							icon={<Icon icon="fullscreen" isLineIcon={false} />}
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
