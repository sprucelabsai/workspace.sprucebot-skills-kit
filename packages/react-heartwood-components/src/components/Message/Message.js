// @flow
import React, { Fragment } from 'react'
import moment from 'moment-timezone'
import cx from 'classnames'

import Icon from '../Icon/Icon'

type MessageProps = {
	/** Message children. */
	children: Node,

	/** Image associated with message sender */
	fromImage?: string,

	/** Name associated with message sender */
	fromName?: string,

	/** Alt description with message sender */
	fromAlt?: string,

	/** Date the message was sent */
	dateSent?: moment,

	/** Informative replies to the message */
	replies?: Array,

	/** Gives additional context for the message */
	detail?: string,

	/** Optional classname */
	className?: string
}

export const Message = (props: MessageProps) => {
	const {
		children,
		className,
		fromImage,
		fromName,
		fromAlt,
		dateSent,
		replies,
		detail
	} = props

	const renderReply = reply => {
		const { type, children } = reply
		var icon = null
		var iconClass = null

		if (type) {
			switch (type) {
				case 'success':
					icon = 'complete'
					iconClass = 'message__reply-icon-success'
					break
				case 'warn':
					icon = 'caution_solid'
					iconClass = 'message__reply-icon-warn'
					break
				case 'critical':
					icon = 'caution_solid'
					iconClass = 'message__reply-icon-critical'
			}
		}

		console.log('ICON', icon, iconClass)

		return (
			<p class="message__reply">
				{icon && (
					<Icon icon={icon} className={cx('message__reply-icon', iconClass)} />
				)}
				<span class="message__reply-text">{children}</span>
			</p>
		)
	}

	return (
		<div className={cx('message', className)}>
			<span class="message__pre">
				<img
					class="message__from-image"
					src={fromImage || ''}
					alt={fromAlt || fromName || ''}
					width="40"
					height="40"
				/>
			</span>
			<span class="message__main">
				<p class="message__from-text">
					{fromName && <span class="message__from-name">{fromName}</span>}
					{dateSent && (
						<span class="message__original-timestamp">
							{' '}
							{dateSent.format('hh:mma')}
						</span>
					)}
				</p>
				<p class="message__body">{children}</p>
				{detail && <p class="message__detail">{detail}</p>}
				{replies && replies.map(renderReply)}
			</span>
		</div>
	)
}

export default Message
