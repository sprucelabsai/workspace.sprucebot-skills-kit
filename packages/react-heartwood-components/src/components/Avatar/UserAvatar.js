// @flow
import React from 'react'
import cx from 'classnames'
import Avatar from './Avatar'
import type { Props as AvatarProps } from './Avatar'

type Props = {
	...AvatarProps,
	user: Object
}

const UserAvatar = (props: Props) => {
	const { user, ...rest } = props
	const { profileImages = {}, defaultProfileImages = {} } = user

	const profileImage =
		(profileImages && profileImages.profile150) ||
		(defaultProfileImages && defaultProfileImages.profile150)

	return <Avatar image={profileImage} {...rest} />
}

export default UserAvatar
