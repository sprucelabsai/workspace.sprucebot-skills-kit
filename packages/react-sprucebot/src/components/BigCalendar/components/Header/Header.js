// @flow
import React from 'react'
import cx from 'classnames'

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
	onChangeView: Function
}

const Header = (props: Props) => {
	return (
		<div className="bigcalendar-header">
			<div className="bigcalendar-header__top">
				<H2 className="">Selected Date</H2>
				<HeaderControls />
			</div>
			<div className="bigcalendar-header__bottom">
				<div className="bigcalendar-header__smalldate">
					<p className="dow">Mo</p>
					<p className="day">27</p>
				</div>
				<Pagination
					onClickNext={() => {}}
					onClickBack={() => {}}
					currentPage={1}
					totalPages={3}
				/>
			</div>
		</div>
	)
}

export default Header
