// @flow
import React from 'react'
import cx from 'classnames'
import List from '../../../List/List'
import type { Props as ListProps } from '../../../List/List'
import EventDetailsHeader from './components/EventDetailsHeader/EventDetailsHeader'
import type { Props as HeaderProps } from './components/EventDetailsHeader/EventDetailsHeader'
import EventDetailsFooter from './components/EventDetailsFooter/EventDetailsFooter'
import type { Props as FooterProps } from './components/EventDetailsFooter/EventDetailsFooter'

export type Props = {
	header: HeaderProps,
	// eslint-disable-next-line flowtype/space-after-type-colon
	kind:
		| 'default'
		| 'tentative'
		| 'active'
		| 'unavailable'
		| 'blocked'
		| 'past'
		| 'warn'
		| 'critical',
	list: ListProps,
	footer: FooterProps
}

const EventDetails = (props: Props) => {
	const { header, list, kind, footer } = props
	const parentClass = cx('event-details', {
		'event-fill-tentative': kind === 'tentative',
		'event-fill-unavailable': kind === 'unavailable',
		'event-fill-blocked': kind === 'blocked',
		'event-fill-active': kind === 'active',
		'event-fill-past': kind === 'past',
		'event-fill-warn': kind === 'warn',
		'event-fill-critical': kind === 'critical'
	})

	return (
		<div className={parentClass}>
			{header && <EventDetailsHeader {...header} />}
			<List {...list} />
			{footer && <EventDetailsFooter {...footer} />}
		</div>
	)
}

EventDetails.defaultProps = {
	kind: 'default'
}

export default EventDetails
