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

	// NOTE: you MUST keep resize-n the first class in any resize-handle
	// IT MUST BE IN THE FORM OF resize-[n|s|e|w]

	return (
		<div
			className={cx('bigcalendar__event-block', className, block.className, {
				busy: block.markAsBusy,
				available: !block.markAsBusy
			})}
			{...rest}
		>
			<div className="resize-n resize-handle">
				<div className="resize-highlight-handle" />
			</div>
			<p className="title">{block.title}</p>
			<p className="time">{startAt.format('h:mma')}</p>
			<div className="resize-s resize-handle">
				<div className="resize-highlight-handle" />
			</div>
		</div>
	)
}

export default EventBlock
