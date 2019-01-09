// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

import EventBlock from '../EventBlock/EventBlock'

import type { Event as EventType, EventBlock as BlockType } from '../../types'

type Props = {
	event: EventType,
	className?: string,
	timezone: string,
	timeFormat: string,
	onMouseDown?: (
		e: MouseEvent,
		payload: { event: EventType, block: BlockType, blockIdx: number }
	) => void | boolean,
	onTouchStart?: (
		e: MouseEvent,
		payload: { event: EventType, block: BlockType, blockIdx: number }
	) => void | boolean
}

const Event = (props: Props) => {
	const {
		event,
		className,
		onMouseDown,
		onTouchStart,
		timezone,
		timeFormat,
		...rest
	} = props
	let startAt = moment.tz(event.startAt, timezone)
	return (
		<div
			className={cx('bigcalendar__event', className, {
				'event-fill-tentative': event.kind === 'tentative',
				'event-fill-unavailable': event.kind === 'unavailable',
				'event-fill-blocked': event.kind === 'blocked',
				'event-fill-active': event.kind === 'active',
				'event-fill-past': event.kind === 'past',
				'event-fill-warn': event.kind === 'warn',
				'event-fill-critical': event.kind === 'critical'
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
							return (
								onMouseDown && onMouseDown(e, { event, block, blockIdx: idx })
							)
						}}
						onTouchStart={e => {
							return (
								onTouchStart && onTouchStart(e, { event, block, blockIdx: idx })
							)
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
	kind: 'default'
}

export default Event
