import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SK from '../../skillskit'

export default class Avatar extends Component {
	handleTapEdit = () => {
		const { user } = this.props

		if (this.canEdit()) {
			SK.editUserProfile({
				userId: user.User.id,
				locationId: user.Location.id
			})
		}
	}

	canEdit = () => {
		const { enableProfileEditing, user, auth } = this.props

		const minimumRequirementsMet =
			auth &&
			enableProfileEditing &&
			user &&
			user.User &&
			user.User.id &&
			user.Location &&
			user.Location.id

		// DELETE THIS OUT WHEN ROLES ARE PROPERLY PASSED
		if (
			minimumRequirementsMet &&
			(auth.role === 'owner' ||
				auth.role === 'teammate' ||
				auth.User.id === user.User.id)
		) {
			return true
		}
		// END DELETE

		//we have all the data, lets do some role checks
		if (minimumRequirementsMet) {
			if (auth.role === 'owner') {
				return true
			} else if (auth.role === 'teammate' && user.role === 'guest') {
				return true
			} else if (auth.User.id === user.User.id) {
				return true
			}
		}

		return false
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
					this.canEdit() ? 'is_editable' : ''
				}`}
				onClick={this.handleTapEdit}
				{...props}
			/>
		)
	}
}

Avatar.propTypes = {
	top: PropTypes.bool,
	auth: PropTypes.object,
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
