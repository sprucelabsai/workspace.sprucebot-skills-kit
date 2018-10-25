// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	hours: Array<Object>,
	className?: string,
	viewHeight: Number,
	scrollTop: Number
}

class TimeGutter extends Component<Props> {
	constructor(props) {
		super(props)
		this.domNode = React.createRef()
	}

	componentDidUpdate = () => {
		this.domNode.current.scrollTop = this.props.scrollTop
	}

	render() {
		const { viewHeight, hours, className } = this.props
		return (
			<div
				className={cx('bigcalendar__time-gutter', className)}
				ref={this.domNode}
				style={{
					height: viewHeight
				}}
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
