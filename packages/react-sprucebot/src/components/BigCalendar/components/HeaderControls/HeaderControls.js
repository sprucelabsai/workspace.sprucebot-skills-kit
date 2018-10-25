// @flow
import React from 'react'
import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import Pagination from '../../../Pagination/Pagination'
import cx from 'classnames'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps,
	onBackDate: Function,
	onNextDate: Function
}

const HeaderControls = (props: Props) => {
	return (
		<div className="bigcalendar__header-controls">
			<Pagination
				isSimple={true}
				onClickNext={props.onNextDate}
				onClickBack={props.onBackDate}
				currentPage={2}
				totalPages={3}
			/>
			<Button kind={'simple'} isSmall={true} text={'Date'} />
			<Button kind={'simple'} isSmall={true} text={'CalendarIcon'} />
			<Select options={['Full Team', 'Me']} />
		</div>
	)
}

export default HeaderControls
