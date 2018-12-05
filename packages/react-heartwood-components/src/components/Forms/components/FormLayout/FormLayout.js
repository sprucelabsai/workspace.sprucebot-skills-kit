// @flow
import React from 'react'
import cx from 'classnames'

export type FormLayoutProps = {
	/** Contents of the Form Layout. Should be FormLayoutItem or FormLayoutGroup components */
	children: Node,

	/** Class name for the layout */
	className?: string,

	/** Vertical spacing of the FormLayoutItem components */
	spacing?: 'base' | 'tight'
}

const FormLayout = (props: FormLayoutProps) => {
	const { children, className, spacing } = props

	return (
		<div
			className={cx('form-layout', className, {
				'form-layout--spacing-tight': spacing === 'tight'
			})}
		>
			{children}
		</div>
	)
}

FormLayout.defaultProps = {
	spacing: 'base'
}

export default FormLayout
