// @flow
import React from 'react'
import Button from '../../components/Button/Button'
import DropdownArrow from '../../../static/assets/icons/ic_arrow_drop_down.svg'

type InputPreProps = {
	id: string,
	label: string,
	postLabel: ?string
}

export const InputPre = (props: InputPreProps) => {
	const { id, label, postLabel } = props
	return (
		<div className="text-input__pre">
			<label htmlFor={id} className="text-input__label">
				{label}
			</label>
			{postLabel && <span className="text-input__post-label">{postLabel}</span>}
		</div>
	)
}

type InputInnerProps = {
	kind: string,
	iconBefore: any,
	iconAfter: any,
	appendix: string,
	handleClear: ?Function
}

export const InputInner = (props: InputInnerProps) => {
	const { kind, iconBefore, iconAfter, appendix, handleClear, ...rest } = props
	return (
		<div className="text-input__inner">
			{iconBefore &&
				React.cloneElement(iconBefore, {
					className: 'text-input__icon-pre'
				})}
			{kind === 'phone-number' && <CountryInput />}
			{kind === 'credit-card' && <p>CC</p>}
			<input className="text-input__input" {...rest} />
			{appendix && <p className="text-input__appendix">{appendix}</p>}
			{iconAfter && (
				<Button
					onClick={handleClear}
					className="text-input__clear-btn"
					icon={iconAfter}
				/>
			)}
		</div>
	)
}

type InputHelperProps = {
	error: string,
	helper: string
}

export const InputHelper = (props: InputHelperProps) => {
	const { error, helper } = props
	return <p className="text-input__helper"> {error || helper}</p>
}
