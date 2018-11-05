// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

import EventBlock from '../EventBlock/EventBlock'

type Props = {
	event: Object,
	className?: string,
	timezone: String
}

const Event = (props: Props) => {
	const {
		event,
		className,
		onMouseDown,
		onTouchStart,
		timezone,
		highlightedBlockIdx,
		...rest
	} = props
	let startAt = moment.tz(event.startAt, timezone)
	return (
		<div
			className={cx('bigcalendar__event', className, event.className)}
			{...rest}
		>
			{event.blocks.map((block, idx) => {
				const eventBlock = (
					<EventBlock
						startAt={startAt}
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

export default Event
