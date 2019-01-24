// @flow
import React from 'react'
import Avatar from '../../../Avatar/Avatar'
import Button from '../../../Button/Button'
import Text from '../../../Text/Text'

type Props = {
	image: string,
	name: string
}

const ProfileSummary = (props: Props) => {
	const { image, name } = props
	return (
		<div className="profile-summary">
			<Avatar image={image} alt={name} className="profile-summary__avatar" />
			<Text className="profile-summary__name">{name}</Text>
			<Button
				className="profile-summary__btn"
				icon={{ name: 'more_vertical', isLineIcon: true }}
				text="More options"
				isIconOnly
			/>
		</div>
	)
}

ProfileSummary.defaultProps = {}

export default ProfileSummary
