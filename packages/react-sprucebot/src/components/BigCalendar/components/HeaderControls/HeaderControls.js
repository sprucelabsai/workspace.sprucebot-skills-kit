// @flow
import React from 'react'
import Select from '../../../Forms/components/Select/Select'
import Button from '../../../Button/Button'
import cx from 'classnames'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps
}

const HeaderControls = (props: Props) => {
	return (
		<div className="bigcalendar-header__controls">
			<Button kind={'simple'} isSmall={true} text={'Date'} />
			<Button kind={'simple'} isSmall={true} text={'CalendarIcon'} />
			<Select options={['Full Team', 'Me']} />
		</div>
	)
}

export default HeaderControls
