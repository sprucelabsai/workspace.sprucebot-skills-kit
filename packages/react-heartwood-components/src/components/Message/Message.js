// @flow
import React from 'react'
import moment from 'moment-timezone'
import cx from 'classnames'

import Button from '../Button/Button'
import Icon from '../Icon/Icon'

import type { Props as ButtonProps } from '../../Button/Button'

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

	/** Additional content related to the message */
	attachments?: Array,

	/** Gives additional context for the message */
	detail?: string,

	/** An action related to this message */
	primaryAction?: ButtonProps,

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
		attachments,
		detail,
		primaryAction
	} = props

	const renderReply = reply => {
		const { type, children } = reply
		let icon = null
		let iconClass = null

		if (type) {
			switch (type) {
				case 'success':
					icon = 'complete'
					iconClass = 'message__reply-icon-success'
					break
				case 'warn':
					icon = 'caution'
					iconClass = 'message__reply-icon-warn'
					break
				case 'critical':
					icon = 'caution_solid'
					iconClass = 'message__reply-icon-critical'
					break
				default:
					return null
			}
		} else {
			return null
		}

		return (
			<p className="message__reply">
				{icon && (
					<Icon icon={icon} className={cx('message__reply-icon', iconClass)} />
				)}
				<span className="message__reply-text">{children}</span>
			</p>
		)
	}

	const renderAttachment = attachment => {
		return <div className="message__attachment">{attachment}</div>
	}

	return (
		<div className={cx('message', className)}>
			<span className="message__pre">
				<img
					className="message__from-image"
					src={fromImage || ''}
					alt={fromAlt || fromName || ''}
					width="40"
					height="40"
				/>
			</span>
			<span className="message__main">
				<p className="message__from-text">
					{fromName && <span className="message__from-name">{fromName}</span>}
					{dateSent && (
						<span className="message__original-timestamp">
							{' '}
							{dateSent.format('hh:mma')}
						</span>
					)}
				</p>
				<p className="message__body">{children}</p>
				{detail && <p className="message__detail">{detail}</p>}
				{primaryAction && (
					<Button
						className="btn-small message__primary-action-btn"
						{...primaryAction}
					/>
				)}
				{replies && replies.length && (
					<div className="message__replies">{replies.map(renderReply)}</div>
				)}
				{attachments && attachments.length && (
					<div className="message__attachments">
						{attachments.map(renderAttachment)}
					</div>
				)}
			</span>
		</div>
	)
}

export default Message
