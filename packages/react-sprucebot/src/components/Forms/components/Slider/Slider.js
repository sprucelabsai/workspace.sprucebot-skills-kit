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

	/** Callback after the slider updates its own value */
	onChange?: Function
}

type State = {
	valueState: number
}

export default class Slider extends Component<Props, State> {
	state = {
		valueState: this.props.value
	}

	handleChange = (e: any) => {
		const { onChange } = this.props
		const newVal = e.target.value
		this.setState({
			valueState: newVal
		})
		if (onChange) {
			onChange(e)
		}
	}

	render() {
		const { valueState } = this.state
		const { label, id, postLabel, min, max, value, ...rest } = this.props
		return (
			<div className="slider-wrapper slider--split-color">
				{label && <InputPre id={id} label={label} postLabel={postLabel} />}
				<input
					{...rest}
					type="range"
					min={min}
					max={max}
					value={valueState}
					className="slider"
					style={{
						'--min': min,
						'--max': max,
						'--val': valueState
					}}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}
