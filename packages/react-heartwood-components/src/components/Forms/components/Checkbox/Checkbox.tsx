import React, { Component, ChangeEvent } from 'react'
import cx from 'classnames'

import CheckIconYes from '../../../../../static/assets/icons/ic_check_box.svg'
import CheckIconNo from '../../../../../static/assets/icons/ic_check_box_outline_blank.svg'
import CheckIconMaybe from '../../../../../static/assets/icons/ic_indeterminate_check_box.svg'

export interface ICheckboxProps extends React.HTMLProps<HTMLInputElement> {
	/** Unique identifier */
	id?: string

	/** optional name we set to this checkbox */
	name?: string

	/** Input label and text after checkbox icon */
	label?: string

	/** Optional text to show below the label */
	postText?: string

	/** Class for the checkbox wrapper */
	className?: string

	/** Set true if the checkbox is indeterminate */
	isIndeterminate?: boolean
}

interface ICheckboxState {}

export default class Checkbox extends Component<
	ICheckboxProps,
	ICheckboxState
> {
	private checkboxRef: React.RefObject<HTMLInputElement>

	public constructor(props: ICheckboxProps) {
		super(props)
		this.checkboxRef = React.createRef()
	}

	public componentDidMount = () => {
		if (this.checkboxRef.current) {
			this.checkboxRef.current.indeterminate = !!this.props.isIndeterminate
		}
	}

	public handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { onChange } = this.props

		if (this.checkboxRef.current) {
			this.checkboxRef.current.indeterminate = false
		}

		if (onChange) {
			onChange(e)
		}
	}

	public render(): React.ReactElement {
		const { id, label, postText, className, ...rest } = this.props
		const parentClass = cx('checkbox-item', className)

		// TODO: We probably need to create explicit whitelists of what we want to
		// allow to be spread onto native DOM elements, since applying non-standard
		// attributes throws a warning.
		delete rest.isIndeterminate

		return (
			<div className={parentClass}>
				<div className="checkbox-item__inner">
					<input
						ref={this.checkboxRef}
						autoComplete={'off'}
						className="checkbox-item__input"
						type="checkbox"
						id={id}
						{...rest}
						// Always use internal change handler
						onChange={this.handleChange}
					/>
					{label && (
						<label className="checkbox-item__label" htmlFor={id}>
							{label}
						</label>
					)}
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
