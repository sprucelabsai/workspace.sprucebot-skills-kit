// @flow
import React from 'react'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'

export type InputPreProps = {
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

export type InputInnerProps = {
	kind?: string,
	iconBefore?: string,
	iconAfter?: any,
	appendix?: string,
	handleClear?: Function
}

export const InputInner = (props: InputInnerProps) => {
	const { kind, iconBefore, iconAfter, appendix, handleClear, ...rest } = props
	return (
		<div className="text-input__inner">
			{iconBefore && (
				<Icon icon={iconBefore} className={'text-input__icon-pre'} />
			)}
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

export type InputHelperProps = {
	error?: string,
	helper?: any
}

export const InputHelper = (props: InputHelperProps) => {
	const { error, helper } = props
	return <p className="text-input__helper"> {error || helper}</p>
}
