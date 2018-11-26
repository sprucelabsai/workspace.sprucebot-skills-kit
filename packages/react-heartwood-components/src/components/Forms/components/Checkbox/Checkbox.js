// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import CheckIconYes from '../../../../../static/assets/icons/ic_check_box.svg'
import CheckIconNo from '../../../../../static/assets/icons/ic_check_box_outline_blank.svg'
import CheckIconMaybe from '../../../../../static/assets/icons/ic_indeterminate_check_box.svg'

type Props = {
	/** Unique identifier */
	id: string,

	/** Input label and text after checkbox icon */
	label: string,

	/** Optional text to show below the label */
	postText: string,

	/** Class for the checkbox wrapper */
	className: ?string,

	/** Set true if the checkbox is indeterminate */
	isIndeterminate?: boolean
}

type State = {
	isIndeterminateState: boolean
}

export default class Checkbox extends Component<Props, State> {
	static defaultProps = {
		isIndeterminate: false
	}

	state = {
		isIndeterminateState: this.props.isIndeterminate
	}

	handleChange = () => {
		this.setState(prevState => {
			if (prevState.isIndeterminateState) {
				return {
					isIndeterminateState: false
				}
			}
		})
	}

	render() {
		const { isIndeterminateState } = this.state
		const {
			id,
			label,
			postText,
			className,
			isIndeterminate,
			...rest
		} = this.props
		const parentClass = cx('checkbox-item', className)

		return (
			<div className={parentClass}>
				<div className="checkbox-item__inner">
					<input
						className="checkbox-item__input"
						type="checkbox"
						id={id}
						indeterminate={isIndeterminateState ? 'true' : null}
						onChange={this.handleChange}
						{...rest}
					/>
					<label className="checkbox-item__label" htmlFor={id}>
						{label}
					</label>
					<div className="checkbox-item__icons">
						<CheckIconYes className="checkbox-item__icon checkbox-item__icon-yes" />
						<CheckIconNo className="checkbox-item__icon checkbox-item__icon-no" />
						<CheckIconMaybe className="checkbox-item__icon checkbox-item__icon-maybe" />
					</div>
				</div>
				{postText && <p className="checkbox-item__post-text">{postText}</p>}
			</div>
		)
	}
}
