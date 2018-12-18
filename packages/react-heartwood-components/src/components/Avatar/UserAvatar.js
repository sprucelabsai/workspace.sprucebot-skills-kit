// @flow
import React from 'react'
import cx from 'classnames'
import Avatar from './Avatar'
import type { Props as AvatarProps } from './Avatar'

type Props = {
	...AvatarProps,
	user: Object,
	className?: string
}

const UserAvatar = (props: Props) => {
	const { user, className, ...rest } = props
	const { profileImages = {}, defaultProfileImages = {} } = user

	const profileImage =
		(profileImages && profileImages.profile150) ||
		(defaultProfileImages && defaultProfileImages.profile150)

	return (
		<Avatar
			image={profileImage}
			className={cx(className, {
				'default-avatar': !profileImages || !profileImages.profile150
			})}
			{...rest}
		/>
	)
}

export default UserAvatar
