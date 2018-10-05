// @flow
import React from 'react'
import cx from 'classnames'
import ArrowIcon from '../../../../static/assets/icons/ic_arrow_drop_down.svg'
import { InputPre, InputHelper } from '../FormPartials'

type Props = {
	id: string,
	options: Array<string>,
	isSimple: ?boolean,
	className: ?string,
	label: ?string,
	postLabel: ?string,
	error: ?string,
	helper: ?string
}

const Select = (props: Props) => {
	const {
		id,
		options,
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
					{options.map(option => <option key={option}>{option}</option>)}
				</select>
				{!isSimple && <ArrowIcon className="select__icon" />}
			</div>
			{(error || helper) && <InputHelper helper={helper} error={error} />}
		</div>
	)
}

export default Select
