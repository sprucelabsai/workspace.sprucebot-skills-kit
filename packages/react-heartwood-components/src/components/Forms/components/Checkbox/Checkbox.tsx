import React, { Component, ChangeEvent } from 'react'
import cx from 'classnames'

import CheckIconYes from '../../../../../static/assets/icons/ic_check_box.svg'
import CheckIconNo from '../../../../../static/assets/icons/ic_check_box_outline_blank.svg'
import CheckIconMaybe from '../../../../../static/assets/icons/ic_indeterminate_check_box.svg'
import { IHWCheckbox } from '@sprucelabs/spruce-types'

export interface ICheckboxProps extends IHWCheckbox {
	/** Class for the checkbox wrapper */
	className?: string

	/** triggered on change */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
		const { id, label, postText, className, name } = this.props
		const parentClass = cx('checkbox-item', className)

		return (
			<div className={parentClass}>
				<div className="checkbox-item__inner">
					<input
						name={name || undefined}
						ref={this.checkboxRef}
						autoComplete={'off'}
						className="checkbox-item__input"
						type="checkbox"
						id={id}
						// Always use internal change handler
						onChange={this.handleChange}
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
