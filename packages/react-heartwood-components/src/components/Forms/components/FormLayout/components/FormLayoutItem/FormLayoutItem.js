// @flow
import React from 'react'
import cx from 'classnames'

export type FormLayoutItemProps = {
	/** Contents of the Form Layout Item */
	children: Node,

	/** Class name for the item */
	className?: string
}

const FormLayoutItem = (props: FormLayoutItemProps) => {
	const { children, className } = props

	return <div className={cx('form-layout__item', className)}>{children}</div>
}

export default FormLayoutItem
