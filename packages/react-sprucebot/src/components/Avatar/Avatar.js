import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Avatar extends Component {
	render() {
		const { className, top, online, image, user, ...props } = this.props

		const style = {}
		let isOnline = online

		//passed an image
		if (typeof image === 'string' && image) {
			style.backgroundImage = `url(${image})`
		} else if (
			user &&
			user.User &&
			user.User.profileImages &&
			user.User.profileImages.profile150
		) {
			style.backgroundImage = `url(${user.User.profileImages.profile150})`
			isOnline = user.status === 'online'
		}

		return (
			<div
				style={style}
				className={`${top ? 'top__avatar' : 'avatar__wrapper'} ${className ||
					''} ${isOnline ? 'online' : ''}`}
				{...props}
			/>
		)
	}
}

Avatar.propTypes = {
	top: PropTypes.bool,
	user: PropTypes.object, //pass this or everything belowe
	image: PropTypes.string,
	showOnlineIndicator: PropTypes.bool,
	online: PropTypes.bool
}

Avatar.defaultProps = {
	top: false,
	showOnlineIndicator: true
}
