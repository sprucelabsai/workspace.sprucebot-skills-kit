// @flow
import React, { PureComponent } from 'react'
import UserAvatar from '../../../Avatar/UserAvatar'

import type { ElementRef } from 'react'

type Props = {
	users: Array<Object>,
	doubleClickTime: number,
	onScroll: Function,
	onDoubleClick?: (e: MouseEvent | TouchEvent) => void,
	onClick?: (e: MouseEvent | TouchEvent) => void
}

class TeammateHeader extends PureComponent<Props> {
	domNodeRef: { current: null | ElementRef<'div'> }

	/** last time a click was done, tracking for double click */
	_lastClickTime: ?Date

	constructor(props: Props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	handleClick = (e: MouseEvent | TouchEvent) => {
		const { doubleClickTime, onDoubleClick, onClick } = this.props

		if (
			this._lastClickTime &&
			new Date() - this._lastClickTime < doubleClickTime
		) {
			this._lastClickTime = null
			onDoubleClick && onDoubleClick(e)
		} else {
			onClick && onClick(e)
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

		delete props.doubleClickTime
		delete props.onDoubleClick

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
