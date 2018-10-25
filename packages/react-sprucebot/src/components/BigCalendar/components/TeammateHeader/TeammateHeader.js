// @flow
import React from 'react'
import cx from 'classnames'
import UserAvatar from '../../../Avatar/UserAvatar'

type Props = {
	users: Array<Object>
}

const TeammateHeader = (props: Props) => {
	return (
		<div className="bigcalendar__teammate-header">
			{props.users.map(u => {
				return (
					<div key={`teammate-${u.id}`} className="teammate">
						<UserAvatar user={u} />
						<div className="">
							<p>{u.name}</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default TeammateHeader
