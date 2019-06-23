// @flow
import React, { Component } from 'react'
import { InputPre } from '../../FormPartials'

type Props = {
	/** Label text */
	label: string,

	/** Unique identifier */
	id: string,

	/** Minimum value */
	min: number,

	/** Maximum value */
	max: number,

	/** Current value */
	value: number,

	/** Text to show after the label */
	postLabel: ?string,

	/** Callback after the slider updates its own value.
	 * Using this property will place the slider in controlled mode. */
	onChange?: Function
}

type State = {
	uncontrolledValue: number
}

export default class Slider extends Component<Props, State> {
	state = {
		uncontrolledValue: this.props.value
	}

	handleUncontrolledChange = (e: any) => {
		this.setState({
			uncontrolledValue: e.target.value
		})
	}

	render() {
		const { uncontrolledValue } = this.state
		const {
			label,
			id,
			postLabel,
			min,
			max,
			value,
			onChange,
			...rest
		} = this.props

		return (
			<div className="slider-wrapper slider--split-color">
				{label && <InputPre id={id} label={label} postLabel={postLabel} />}
				<input
					{...rest}
					type="range"
					min={min}
					max={max}
					value={onChange ? value : uncontrolledValue}
					className="slider"
					style={{
						'--min': min,
						'--max': max,
						'--val': onChange ? value : uncontrolledValue
					}}
					onChange={onChange ? onChange : this.handleUncontrolledChange}
				/>
			</div>
		)
	}
}
