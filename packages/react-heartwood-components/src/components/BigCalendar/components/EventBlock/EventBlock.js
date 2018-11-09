// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

type Props = {
	block: Object,
	text?: string,
	children?: Node,
	className?: string,
	startAt: Object
}

const EventBlock = (props: Props) => {
	const { block, className, startAt, ...rest } = props

	return (
		<div
			className={cx('bigcalendar__event-block', className, {
				busy: block.markAsBusy,
				available: !block.markAsBusy
			})}
			{...rest}
		>
			<p className="title">{block.title}</p>
			<p className="time">{startAt.format('h:mma')}</p>
		</div>
	)
}

export default EventBlock
