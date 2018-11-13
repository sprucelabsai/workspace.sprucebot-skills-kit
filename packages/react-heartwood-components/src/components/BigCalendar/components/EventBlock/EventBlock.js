// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import Icon from '../../../Icon/Icon'

type Props = {
	block: Object,
	text?: string,
	children?: Node,
	className?: string,
	startAt: Object,
	resizable: Boolean
}

const EventBlock = (props: Props) => {
	const { block, resizable, className, startAt, ...rest } = props

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
			{block.leftIcons && block.leftIcons.length > 0 && (
				<div className="left-icons">
					{block.leftIcons.map(icon => (
						<span title={icon.title}>
							<Icon {...icon} />
						</span>
					))}
				</div>
			)}
			{resizable && (
				<div className="resize-n resize-handle">
					<div className="resize-highlight-handle" />
				</div>
			)}
			<p className="title" dangerouslySetInnerHTML={{ __html: block.title }} />
			{block.subtitle && (
				<p
					className="subtitle"
					dangerouslySetInnerHTML={{ __html: block.subtitle }}
				/>
			)}
			<p className="time">{startAt.format('h:mma')}</p>
			{resizable && (
				<div className="resize-s resize-handle">
					<div className="resize-highlight-handle" />
				</div>
			)}
			{block.rightIcons && block.rightIcons.length > 0 && (
				<div className="right-icons">
					{block.rightIcons.map(icon => (
						<span title={icon.title}>
							<Icon {...icon} />
						</span>
					))}
				</div>
			)}
		</div>
	)
}

export default EventBlock
