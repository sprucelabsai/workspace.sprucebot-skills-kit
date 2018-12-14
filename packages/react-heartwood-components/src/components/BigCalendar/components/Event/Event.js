// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

import EventBlock from '../EventBlock/EventBlock'

type Props = {
	event: Object,
	className?: string,
	timezone: String,
	timeFormat: String,
	type:
		| 'default'
		| 'tentative'
		| 'active'
		| 'unavailable'
		| 'blocked'
		| 'past'
		| 'warn'
		| 'critical'
}

const Event = (props: Props) => {
	const {
		event,
		className,
		onMouseDown,
		onTouchStart,
		timezone,
		timeFormat,
		type,
		...rest
	} = props
	let startAt = moment.tz(event.startAt, timezone)
	return (
		<div
			className={cx('bigcalendar__event', className, {
				'event-fill-tentative': event.type === 'tentative',
				'event-fill-unavailable': event.type === 'unavailable',
				'event-fill-blocked': event.type === 'blocked',
				'event-fill-active': event.type === 'active',
				'event-fill-past': event.type === 'past',
				'event-fill-warn': event.type === 'warn',
				'event-fill-critical': event.type === 'critical'
			})}
			{...rest}
		>
			{event.blocks.map((block, idx) => {
				const eventBlock = (
					<EventBlock
						resizable={event.resizable !== false}
						startAt={startAt}
						timeFormat={timeFormat}
						onMouseDown={e => {
							onMouseDown && onMouseDown({ e, event, block, blockIdx: idx })
						}}
						onTouchStart={e => {
							onTouchStart && onTouchStart({ e, event, block, blockIdx: idx })
						}}
						key={`block-${event.id}-${idx}`}
						block={block}
					/>
				)

				startAt = moment(startAt).add(block.durationSec, 'seconds')
				return eventBlock
			})}
		</div>
	)
}

Event.defaultProps = {
	type: 'default'
}

export default Event
