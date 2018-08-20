import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SK from '../../skillskit'

export default class Avatar extends Component {
	handleTapEdit = () => {
		const { user, enableProfileEditing } = this.props

		if (
			enableProfileEditing &&
			user &&
			user.User &&
			user.User.id &&
			user.Location &&
			user.Location.id
		) {
			SK.editUserProfile({
				userId: user.User.id,
				locationId: user.Location.id
			})
		}
	}

	render() {
		const {
			className,
			top,
			online,
			image,
			user,
			showOnlineIndicator,
			enableProfileEditing,
			...props
		} = this.props

		const style = {}
		let isOnline = online

		//passed an image
		if (typeof image === 'string' && image) {
			style.backgroundImage = `url('${image}')`
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
					''} ${isOnline ? 'online' : ''} ${
					enableProfileEditing && user && user.User ? 'is_editable' : ''
				}`}
				onClick={this.handleTapEdit}
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
	online: PropTypes.bool,
	enableProfileEditing: PropTypes.bool
}

Avatar.defaultProps = {
	top: false,
	showOnlineIndicator: true,
	enableProfileEditing: false
}
