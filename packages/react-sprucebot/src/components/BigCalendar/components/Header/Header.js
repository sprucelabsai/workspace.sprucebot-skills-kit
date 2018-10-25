// @flow
import React from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

// sub components
import HeaderControls from '../HeaderControls/HeaderControls'
import Button from '../../../Button/Button'
import Pagination from '../../../Pagination/Pagination'

import { H2 } from '../../../Text/Text'

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
	dateFormat: String
}

const Header = (props: Props) => {
	return (
		<div className="bigcalendar__header">
			<div className="bigcalendar__header-top">
				<H2 className="">{props.selectedDate.format(props.dateFormat)}</H2>
				<HeaderControls
					onBackDate={props.onBackDate}
					onNextDate={props.onNextDate}
					onChangeView={props.onChangeView}
				/>
			</div>
			<div className="bigcalendar__header-bottom">
				<div className="bigcalendar__header-smalldate">
					<p className="dow">{props.selectedDate.format('dd')}</p>
					<p className="day">{props.selectedDate.format('D')}</p>
				</div>
				<Pagination
					onClickNext={() => {}}
					onClickBack={() => {}}
					currentPage={1}
					totalPages={1}
				/>
			</div>
		</div>
	)
}

export default Header
