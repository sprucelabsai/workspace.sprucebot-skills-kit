// @flow
import React from 'react'
import moment from 'moment-timezone'
import cx from 'classnames'

import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

import type { Props as ButtonProps } from '../../Button/Button'

type FromProps = {
	/** Unique id of the sender */
	id: string,

	/** Image associated with message sender */
	image?: string,

	/** Name associated with message sender */
	name?: string,

	/** Alt description with message sender */
	alt?: string
}

type MessageProps = {
	/** Message children. */
	children: Node,

	/** Information about the sender */
	from: FromProps,

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
	className?: string,

	/** Set true if the message is from Sprucebot */
	isFromSprucebot?: boolean
}

export const Message = (props: MessageProps) => {
	const {
		children,
		className,
		from,
		dateSent,
		replies,
		attachments,
		detail,
		primaryAction,
		isFromSprucebot
	} = props

	if (typeof from === 'undefined') {
		return null
	}

	const { id: fromId, name: fromName, image: fromImage, alt: fromAlt } = from

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

	const renderImage = ({ image, alt, isFromSprucebot }) => {
		if (isFromSprucebot) {
			return (
				<img
					className="message__from-image message__from-sprucebot-image"
					src={image || null}
					alt={alt || ''}
					width="40"
					height="40"
				/>
			)
		}
		return <Avatar image={image || ''} alt={alt || ''} />
	}

	return (
		<div className={cx('message', className)}>
			<span className="message__pre">
				{fromImage ? (
					renderImage({
						image: fromImage,
						alt: fromAlt || fromName || '',
						isFromSprucebot
					})
				) : (
					<span className="message__original-timestamp">
						{' '}
						{dateSent.format('hh:mma')}
					</span>
				)}
			</span>
			<span className="message__main">
				{fromImage && (
					<p className="message__from-text">
						{fromName && <span className="message__from-name">{fromName}</span>}
						{dateSent && (
							<span className="message__original-timestamp">
								{' '}
								{dateSent.format('hh:mma')}
							</span>
						)}
					</p>
				)}
				<p className="message__body">{children}</p>
				{detail && <p className="message__detail">{detail}</p>}
				{primaryAction && (
					<Button
						className="btn-small message__primary-action-btn"
						{...primaryAction}
					/>
				)}
				{replies && replies.length > 0 && (
					<div className="message__replies">{replies.map(renderReply)}</div>
				)}
				{attachments && attachments.length > 0 && (
					<div className="message__attachments">
						{attachments.map(renderAttachment)}
					</div>
				)}
			</span>
		</div>
	)
}

Message.defaultProps = {
	isFromSprucebot: false
}

export default Message
