// @flow
import React from 'react'
import cx from 'classnames'

export type Props = {
	/** Avatar image url. */
	image: string,

	/** Alt text. */
	alt: string,

	/** Set this true to use a large variation */
	isLarge?: boolean,

	/** Set true to center align with name and text. */
	isVertical?: boolean,

	/** Set true to show a status indicator. */
	showIndicator?: boolean,

	/** Status (online or offline) of this person */
	status?: 'online' | 'offline',

	/** Name of this person. */
	name?: string,

	/** Optional additinal text to show below name. */
	text?: string,

	/** Manual width override. */
	width?: ?number,

	/** Manual height override. */
	height?: ?number
}

const Avatar = (props: Props) => {
	const {
		image,
		alt,
		isLarge,
		isVertical,
		showIndicator,
		status,
		name,
		text,
		width,
		height,
		className
	} = props
	const wrapperClass = cx('avatar-wrapper', className, {
		'avatar-wrapper-large': isLarge,
		'avatar-wrapper-has-text': text,
		'avatar-wrapper-vertical': isVertical
	})
	const indicatorClass = cx('avatar__indicator', {
		'avatar__indicator--is-online': status === 'online'
	})
	let imgWidth = 40
	let imgHeight = 40
	if (isLarge) {
		imgWidth = 96
		imgHeight = 96
	}
	if (width) {
		imgWidth = width
	}
	if (height) {
		imgHeight = height
	}
	return (
		<div className={wrapperClass}>
			<div className="avatar__image-wrapper">
				<img
					className="avatar"
					src={image}
					alt={alt}
					width={imgWidth}
					height={imgHeight}
				/>
				{showIndicator && <div className={indicatorClass} />}
			</div>
			{(name || text) && (
				<div className="avatar__text-wrapper">
					{name && <p className="avatar__name">{name}</p>}
					{text && <p className="avatar__text">{text}</p>}
				</div>
			)}
		</div>
	)
}

Avatar.defaultProps = {
	isLarge: false,
	isVertical: false,
	showIndicator: false,
	status: 'offline',
	name: '',
	text: '',
	width: null,
	height: null
}

export default Avatar
