// @flow
import React from 'react'
import cx from 'classnames'
import List, { Props as ListProps } from '../../../List/List'
import EventDetailsHeader, {
	Props as HeaderProps
} from './components/EventDetailsHeader/EventDetailsHeader'
import EventDetailsFooter, {
	Props as FooterProps
} from './components/EventDetailsFooter/EventDetailsFooter'

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
			<EventDetailsHeader {...header} />
			<List {...list} />
			<EventDetailsFooter {...footer} />
		</div>
	)
}

export default EventDetails
