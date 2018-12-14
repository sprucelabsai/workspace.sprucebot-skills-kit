// @flow
import React, { PureComponent } from 'react'
import cx from 'classnames'

type Props = {
	hours: Array<Object>,
	className?: string,
	calendarBodyHeight: Number
}

class TimeGutter extends PureComponent<Props> {
	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	setScrollTop = top => {
		this.domNodeRef.current.scrollTop = top
	}

	render() {
		const {
			calendarBodyHeight,
			hours,
			className,
			children,
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
							<div key={`${hour.timestamp}-gutter`} className="hour-block">
								{idx > 0 && <p>{hour.label}</p>}
							</div>
						)
					})}
					{children}
				</div>
			</div>
		)
	}
}

export default TimeGutter
