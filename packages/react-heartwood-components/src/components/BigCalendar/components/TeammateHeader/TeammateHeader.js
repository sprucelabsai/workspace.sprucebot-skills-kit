// @flow
import React, { PureComponent } from 'react'
import cx from 'classnames'
import UserAvatar from '../../../Avatar/UserAvatar'
import eventUtil from '../../utils/event'

type Props = {
	users: Array<Object>,
	onScroll: Function,
	onDoubleClick?: Function,
	doubleClickTime: Number
}

class TeammateHeader extends PureComponent<Props> {
	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	handleClick = e => {
		const {
			doubleClickTime,
			onDoubleClick = () => {},
			onClick = () => {}
		} = this.props
		if (
			this._lastClickTime &&
			new Date() - this._lastClickTime < doubleClickTime
		) {
			let { clientX, clientY } = eventUtil.clientXY(e)
			clientX = clientX + this.domNodeRef.current.scrollLeft

			onDoubleClick({ clientX, clientY, e })
		} else {
			onClick(e)
		}
		this._lastClickTime = new Date()

		// keep it from highlighting text
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		const {
			users,
			onScroll,
			onDoubleClick,
			doubleClickTime,
			onClick,
			...props
		} = this.props

		return (
			<div
				className="bigcalendar__teammate-header"
				{...props}
				onClick={this.handleClick}
			>
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
