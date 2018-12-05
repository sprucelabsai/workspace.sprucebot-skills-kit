// @flow
import React, { PureComponent } from 'react'
import cx from 'classnames'

// sub components
import HeaderControls from '../HeaderControls/HeaderControls'
import Pagination from '../../../Pagination/Pagination'
import Button from '../../../Button/Button'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps,
	selectedView: string,
	onChangeView: Function,
	onBackDate: Function,
	onNextDate: Function,
	selectedDate: Object,
	dateFormat: String,
	mobileDateFormat: String,
	fullScreenNode: Object,
	totalHorizontalPages: Number,
	currentHorizontalPage: Number,
	onHorizontalPageNext: Function,
	onHorizontalPageBack: Function,
	userModeOptions?: Array<Object>,
	onChangeUserMode?: Function,
	userMode?: String,
	onDateToToday: Function,
	onSelectDate: Function,
	onDoubleClick?: Function,
	onClickMore?: Function
}

type State = {
	showingSubMenu: Boolean
}

class Header extends PureComponent<Props, State> {
	state = {
		showingSubMenu: false
	}

	handleShowSubMenu = () => {
		this.setState({ showingSubMenu: true })
	}
	handleHideSubMenu = () => {
		this.setState({ showingSubMenu: false })
	}
	render() {
		const {
			selectedDate,
			dateFormat,
			mobileDateFormat,
			userModeOptions,
			onChangeUserMode,
			userMode,
			fullScreenNode,
			onBackDate,
			onNextDate,
			onChangeView,
			onSelectDate,
			onDateToToday,
			onHorizontalPageNext,
			onHorizontalPageBack,
			currentHorizontalPage,
			totalHorizontalPages,
			doubleClickTime,
			selectedView,
			...props
		} = this.props
		return (
			<div className="bigcalendar__header" {...props}>
				<div className="bigcalendar__header-top">
					<h2>{selectedDate.format(dateFormat)}</h2>
					<div
						className={cx('bigcalendar__mobile-submenu-underlay', {
							showing: this.state.showingSubMenu
						})}
					/>
					<div
						className={cx('bigcalendar__mobile-submenu', {
							showing: this.state.showingSubMenu
						})}
					>
						<Button
							className="bigcalendar-hide-menu__button"
							icon={{ name: 'close' }}
							onClick={this.handleHideSubMenu}
						/>
						<h2>{selectedDate.format(mobileDateFormat)}</h2>
						<HeaderControls
							userModeOptions={userModeOptions}
							onChangeUserMode={onChangeUserMode}
							userMode={userMode}
							fullScreenNode={fullScreenNode}
							onBackDate={onBackDate}
							onNextDate={onNextDate}
							onChangeView={onChangeView}
							onSelectDate={onSelectDate}
							onDateToToday={onDateToToday}
							selectedDate={selectedDate}
							isDatePickerShown={this.state.showingSubMenu}
						/>
					</div>
					<Button
						kind={'simple'}
						className="bigcalendar-menu__button"
						onClick={this.handleShowSubMenu}
						icon={{ name: 'more', isLineIcon: true }}
					/>
				</div>
				<div className="bigcalendar__header-bottom">
					<div className="bigcalendar__header-smalldate">
						<p className="dow">{selectedDate.format('dd')}</p>
						<p className="day">{selectedDate.format('D')}</p>
					</div>
					<Pagination
						onClickNext={onHorizontalPageNext}
						onClickBack={onHorizontalPageBack}
						currentPage={currentHorizontalPage}
						totalPages={totalHorizontalPages}
					/>
				</div>
			</div>
		)
	}
}

export default Header
