// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	image: string,
	alt: string,
	isLarge?: boolean,
	isVertical?: boolean,
	showIndicator?: boolean,
	status?: 'online' | 'offline',
	name?: string,
	text?: string,
	width?: ?number,
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
		height
	} = props
	const wrapperClass = cx('avatar-wrapper', {
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
