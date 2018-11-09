// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	hours: Array<Object>,
	className?: string,
	calendarBodyHeight: Number,
	scrollTop: Number
}

class TimeGutter extends Component<Props> {
	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	componentDidUpdate = () => {
		this.domNodeRef.current.scrollTop = this.props.scrollTop
	}

	render() {
		const {
			calendarBodyHeight,
			hours,
			className,
			scrollTop,
			...props
		} = this.props
		return (
			<div
				className={cx('bigcalendar__time-gutter', className)}
				ref={this.domNodeRef}
				style={{
					height: calendarBodyHeight
				}}
				{...props}
			>
				<div className="inner">
					{hours.map((hour, idx) => {
						return (
							<div key={hour.label} className="hour-block">
								{idx > 0 && <p>{hour.label}</p>}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default TimeGutter
