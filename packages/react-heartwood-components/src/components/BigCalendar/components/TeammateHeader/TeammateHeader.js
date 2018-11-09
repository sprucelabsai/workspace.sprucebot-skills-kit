// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import UserAvatar from '../../../Avatar/UserAvatar'

type Props = {
	users: Array<Object>,
	onScroll: Function
}

class TeammateHeader extends Component<Props> {
	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	render() {
		const { users, onScroll, ...props } = this.props

		return (
			<div className="bigcalendar__teammate-header" {...props}>
				<div className="inner" ref={this.domNodeRef} onScroll={onScroll}>
					{users.map(u => {
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
			</div>
		)
	}
}

export default TeammateHeader
