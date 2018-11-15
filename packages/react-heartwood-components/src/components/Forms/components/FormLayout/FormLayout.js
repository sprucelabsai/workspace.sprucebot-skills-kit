// @flow
import React from 'react'
import cx from 'classnames'

export type FormLayoutProps = {
	/** Contents of the Form Layout. Should be FormLayoutItem or FormLayoutGroup components */
	children: Node,

	/** Class name for the layout */
	className?: string
}

const FormLayout = (props: FormLayoutProps) => {
	const { children, className } = props

	return <div className={cx('form-layout', className)}>{children}</div>
}

export default FormLayout
