// @flow
import React from 'react'
import Avatar from '../../../Avatar/Avatar'
import Button from '../../../Button/Button'
import Text from '../../../Text/Text'

type Props = {
	image: string,
	name: string,
	onButtonClick: Function
}

const ProfileSummary = (props: Props) => {
	const { image, name, onButtonClick } = props
	return (
		<div className="profile-summary">
			<Avatar image={image} alt={name} className="profile-summary__avatar" />
			<Text className="profile-summary__name">{name}</Text>
			<Button
				onClick={onButtonClick}
				className="profile-summary__btn"
				icon={{ name: 'more_vertical', isLineIcon: true }}
				text="More options"
				isIconOnly
				isSmall
			/>
		</div>
	)
}

ProfileSummary.defaultProps = {}

export default ProfileSummary
