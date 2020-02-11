import { IHWAction, IHWCheckbox } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { ChangeEvent, Component } from 'react'
import CheckIconYes from '../../../../../static/assets/icons/ic_check_box.svg'
import CheckIconNo from '../../../../../static/assets/icons/ic_check_box_outline_blank.svg'
import CheckIconMaybe from '../../../../../static/assets/icons/ic_indeterminate_check_box.svg'

export interface ICheckboxProps extends Omit<IHWCheckbox, 'isIndeterminate'> {
	/** Class for the checkbox wrapper */
	className?: string

	/** triggered on change */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

	/** Is this 3 states, on, off, or half */
	isIndeterminate?: boolean

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
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
		const {
			action,
			className,
			id,
			isChecked,
			isDisabled,
			label,
			name,
			onAction,
			postText
		} = this.props
		const parentClass = cx('checkbox-item', className)

		return (
			<div className={parentClass}>
				<div className="checkbox-item__inner">
					<input
						checked={isChecked || false}
						name={name || undefined}
						ref={this.checkboxRef}
						autoComplete={'off'}
						className="checkbox-item__input"
						disabled={isDisabled || false}
						id={id}
						// Always use internal change handler
						onChange={(...args) => {
							this.handleChange(...args)

							if (onAction && action) {
								onAction(action)
							}
						}}
						type="checkbox"
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
