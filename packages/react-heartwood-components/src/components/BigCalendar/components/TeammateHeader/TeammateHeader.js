// @flow
import React, { PureComponent } from 'react'
import UserAvatar from '../../../Avatar/UserAvatar'
import eventUtil from '../../utils/event'

import type { ElementRef } from 'react'

type DoubleClickParams = {
	clientX: number,
	clientY: number,
	e: Event
}

type Props = {
	users: Array<Object>,
	doubleClickTime: number,
	onScroll: Function,
	onDoubleClick?: (params: DoubleClickParams) => void,
	onClick?: (e: Event) => void
}

class TeammateHeader extends PureComponent<Props> {
	domNodeRef: { current: null | ElementRef<'div'> }
	_lastClickTime: Date

	constructor(props: Props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	handleClick = (e: Event) => {
		const {
			doubleClickTime,
			onDoubleClick = (/* params: DoubleClickParams */) => {},
			onClick = () => {}
		} = this.props

		if (
			this.domNodeRef.current &&
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

	setScrollLeft = (left: number) => {
		if (this.domNodeRef.current) {
			this.domNodeRef.current.scrollLeft = left
		}
	}

	render() {
		const { users, onScroll, ...props } = this.props

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
