// @flow
import React from 'react'
import Avatar from '../../../../../Avatar/Avatar'

type Props = {
	image: string,
	name: string
}

const UserMenu = (props: Props) => {
	const { image, name } = props

	return (
		<div className="user-menu">
			<button className="btn header-primary__user-btn">
				<span className="btn__inner">
					<Avatar image={image} alt={name} width={32} height={32} />
				</span>
			</button>
		</div>
	)
}

export default UserMenu
