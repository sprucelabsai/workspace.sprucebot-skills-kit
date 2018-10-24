// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import SearchIcon2 from '../../../../../static/assets/icons/ic_search.svg'
import CancelIcon from '../../../../../static/assets/icons/ic_cancel.svg'
import { InputInner } from '../../FormPartials'

type State = {
	value: string
}

type Props = {
	className: string,
	defaultValue: ?string,
	isSmall?: boolean
}

export default class Search extends Component<Props, State> {
	state = {
		value: this.props.defaultValue || ''
	}

	handleChange = (e: any) => {
		const value = e.target.value
		this.setState({
			value
		})
	}

	handleClear = () => {
		this.setState({
			value: ''
		})
	}

	render() {
		const { className, defaultValue, isSmall, ...rest } = this.props
		const { value } = this.state
		return (
			<div
				className={cx('text-input', className, { 'text-input-small': isSmall })}
			>
				<InputInner
					iconBefore={<SearchIcon2 />}
					iconAfter={value && value.length > 0 && <CancelIcon />}
					onChange={this.handleChange}
					value={value}
					handleClear={this.handleClear}
					{...rest}
				/>
			</div>
		)
	}
}
