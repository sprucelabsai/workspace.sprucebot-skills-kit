// @flow
import React from 'react'
import cx from 'classnames'
import ArrowIcon from '../../../../../static/assets/icons/ic_arrow_drop_down.svg'
import { InputPre, InputHelper } from '../../FormPartials'

type Props = {
	/** Unique identifier */
	id: string,

	/** Options for the select */
	options: Object,

	/** Set true to use the simple variation */
	isSimple?: boolean,

	/** Parent class */
	className?: string,

	/** Label text */
	label?: string,

	/** Text after label */
	postLabel?: string,

	/** Error text */
	error?: string,

	/** Helper text */
	helper?: string
}

const Select = (props: Props) => {
	const {
		id,
		options = {},
		isSimple,
		className,
		label,
		postLabel,
		error,
		helper,
		...rest
	} = props
	const parentClass = cx('select text-input__inner', className, {
		'select-simple': isSimple,
		'select--has-error': error
	})

	return (
		<div className="select-wrapper">
			{label && <InputPre id={id} label={label} postLabel={postLabel} />}
			<div className={parentClass}>
				<select {...rest}>
					{Object.keys(options).map(key => (
						<option value={key} key={`${key}`}>
							{options[key]}
						</option>
					))}
				</select>
				{!isSimple && <ArrowIcon className="select__icon" />}
			</div>
			{(error || helper) && <InputHelper helper={helper} error={error} />}
		</div>
	)
}

export default Select
