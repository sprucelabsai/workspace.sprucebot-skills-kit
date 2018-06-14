import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { injectGlobal } from 'styled-components'
import is from 'is_js'
import RCTimePicker from 'rc-time-picker'
import moment from 'moment'

const Input = styled.input`
	width: unset;
	flex: 2;
	background-color: transparent;
	border: none;
	color: #808080;
	font-size: 1.2em;
	margin: 0.5em;
	padding: 0;
	text-align: center;

	&::-webkit-clear-button {
		display: none;
	}
	&::-ms-clear {
		display: none;
	}
`

injectGlobal`
	.rc-time-picker {
		display: inline-block;
		box-sizing: border-box;
	}
	.rc-time-picker * {
		box-sizing: border-box;
	}
	.rc-time-picker-input {
		flex: 2;
		background-color: transparent;
		border: none;
		color: #808080;
		font-size: 1.2em;
		margin: 0.5em;
		padding: 0;
		width: 100%;
		position: relative;
		display: inline-block;
		height: 28px;
		cursor: text;
		line-height: 1.5;
		border-radius: 4px;
		text-align: center;
		transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
			background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
			box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	.rc-time-picker-input[disabled] {
		color: #ccc;
		background: #f7f7f7;
		cursor: not-allowed;
	}
	.rc-time-picker-panel {
		z-index: 1070;
		width: 170px;
		position: absolute;
		box-sizing: border-box;
	}
	.rc-time-picker-panel * {
		box-sizing: border-box;
	}
	.rc-time-picker-panel-inner {
		display: inline-block;
		position: relative;
		outline: none;
		list-style: none;
		font-size: 12px;
		text-align: left;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 1px 5px #ccc;
		background-clip: padding-box;
		border: 1px solid #ccc;
		line-height: 1.5;
	}
	.rc-time-picker-panel-narrow {
		max-width: 113px;
	}
	.rc-time-picker-panel-input {
		color: #808080;
		font-size: 1.2em;
		margin: 0;
		padding: 0;
		width: 100%;
		cursor: auto;
		line-height: 1.5;
		outline: 0;
		border: 1px solid transparent;
	}
	.rc-time-picker-panel-input-wrap {
		box-sizing: border-box;
		position: relative;
		padding: 6px;
		border-bottom: 1px solid #e9e9e9;
	}
	.rc-time-picker-panel-input-invalid {
		border-color: red;
	}
	.rc-time-picker-panel-clear-btn {
		position: absolute;
		right: 6px;
		cursor: pointer;
		overflow: hidden;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		top: 6px;
		margin: 0;
	}
	.rc-time-picker-panel-clear-btn:after {
		content: 'x';
		font-size: 12px;
		color: #aaa;
		display: inline-block;
		line-height: 1;
		width: 20px;
		transition: color 0.3s ease;
	}
	.rc-time-picker-panel-clear-btn:hover:after {
		color: #666;
	}
	.rc-time-picker-panel-select {
		float: left;
		font-size: 12px;
		border: 1px solid #e9e9e9;
		border-width: 0 1px;
		margin-left: -1px;
		box-sizing: border-box;
		width: 56px;
		max-height: 144px;
		overflow-y: auto;
		position: relative;
	}
	.rc-time-picker-panel-select-active {
		overflow-y: auto;
	}
	.rc-time-picker-panel-select:first-child {
		border-left: 0;
		margin-left: 0;
	}
	.rc-time-picker-panel-select:last-child {
		border-right: 0;
	}
	.rc-time-picker-panel-select ul {
		list-style: none;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-x: hidden;
	}
	.rc-time-picker-panel-select li {
		color: #808080;
		font-size: 1.2em;
		list-style: none;
		box-sizing: content-box;
		margin: 0;
		padding: 0 0 0 16px;
		width: 100%;
		height: 24px;
		line-height: 24px;
		text-align: left;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.rc-time-picker-panel-select li:hover {
		background: #edfaff;
	}
	li.rc-time-picker-panel-select-option-selected {
		background: #f7f7f7;
		font-weight: bold;
	}
	li.rc-time-picker-panel-select-option-disabled {
		color: #ccc;
	}
	li.rc-time-picker-panel-select-option-disabled:hover {
		background: transparent;
		cursor: not-allowed;
	}
`

export default class TimeInput extends Component {
	constructor(props) {
		super(props)
		const { defaultValue, ...rest } = props
		this.state = {
			value: defaultValue || '',
			time: defaultValue ? moment(`2017-04-01 ${defaultValue}`) : '',
			rest
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value) {
			this.setState({
				value: nextProps.value
			})
		}
	}

	onChange = e => {
		const { onChange } = this.props
		if (onChange) {
			onChange(this.input.value)
		}
		this.setState({
			value: this.input.value
		})
	}
	onKeyDown = e => {
		const { disableEnter, onKeyDown } = this.props
		if (disableEnter && e.key === 'Enter') {
			e.preventDefault()
		}

		if (onKeyDown) {
			onKeyDown(e)
		}
	}
	onTimePickerChange = async momentTime => {
		const { onChange } = this.props
		const time = momentTime.format('HH:mm')
		await this.setState({
			value: time
		})
		if (onChange) {
			onChange(time)
		}
	}

	get value() {
		return this.state.value
	}

	render() {
		const {
			onChange,
			onKeyDown,
			defaultValue,
			value,
			disableEnter,
			usePicker,
			...rest
		} = this.props

		return (
			<Fragment>
				{(is.chrome() || is.safari()) && is.mobile() && !usePicker ? (
					<Input
						type="time"
						value={this.state.value}
						onKeyDown={this.onKeyDown}
						onChange={this.onChange}
						innerRef={ref => (this.input = ref)}
						{...rest}
					/>
				) : (
					<Fragment>
						<RCTimePicker
							ref={ref => (this.timePicker = ref)}
							showSecond={false}
							minuteStep={5}
							defaultValue={this.state.time}
							onChange={this.onTimePickerChange}
							format={'h:mm a'}
							use12Hours
							inputReadOnly
							{...rest}
						/>
					</Fragment>
				)}
			</Fragment>
		)
	}
}

TimeInput.propTypes = {
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	usePicker: PropTypes.boolean,
	value: PropTypes.string
}

TimeInput.defaultProps = {}
