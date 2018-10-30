// @flow
import React from 'react'
import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import Pagination from '../../../Pagination/Pagination'
import cx from 'classnames'
import screenfull from 'screenfull'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps,
	onBackDate: Function,
	onNextDate: Function,
	onChangeView: Function,
	fullScreenNodeRef: Object
}

const HeaderControls = (props: Props) => {
	return (
		<div className="bigcalendar__header-controls">
			<Pagination
				isSimple={true}
				onClickNext={props.onNextDate}
				onClickBack={props.onBackDate}
				currentPage={1}
				totalPages={3}
			/>
			<Button
				kind={'simple'}
				isSmall={true}
				text={'Date'}
				className="bigcalendar__selectedDate-button"
			/>
			<Button
				kind={'simple'}
				isSmall={true}
				text={'CalendarIcon'}
				className="bigcalendar__calendarIcon-button"
			/>
			<Select options={['Full Team', 'Me']} onChange={props.onChangeView} />
			<Button
				kind="simple"
				text="Full Screen"
				onClick={() => {
					screenfull.toggle(props.fullScreenNodeRef.current)
				}}
			/>
		</div>
	)
}

export default HeaderControls
