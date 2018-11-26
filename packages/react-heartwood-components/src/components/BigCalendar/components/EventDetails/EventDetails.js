// @flow
import React from 'react'
import cx from 'classnames'
import List from '../../../List/List'
import type { Props as ListProps } from '../../../List/List'
import EventDetailsHeader from './components/EventDetailsHeader/EventDetailsHeader'
import type { Props as HeaderProps } from './components/EventDetailsHeader/EventDetailsHeader'
import EventDetailsFooter from './components/EventDetailsFooter/EventDetailsFooter'
import type { Props as FooterProps } from './components/EventDetailsFooter/EventDetailsFooter'

type Props = {
	header: HeaderProps,
	status: 'event-busy' | 'event-unconfirmed' | 'break' | 'block',
	list: ListProps,
	footer: FooterProps
}

const EventDetails = (props: Props) => {
	const { header, list, status, footer } = props
	const parentClass = cx('event-details card l-pb-0', {
		'event-confirmed': status === 'event-busy',
		'event-unconfirmed': status === 'event-unconfirmed',
		break: status === 'break',
		block: status === 'block'
	})

	return (
		<div className={parentClass}>
			{header && <EventDetailsHeader {...header} />}
			<List {...list} />
			{footer && <EventDetailsFooter {...footer} />}
		</div>
	)
}

export default EventDetails
