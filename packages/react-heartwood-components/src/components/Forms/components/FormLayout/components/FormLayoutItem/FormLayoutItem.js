// @flow
import React from 'react'
import cx from 'classnames'

export type FormLayoutItemProps = {
	/** Contents of the Form Layout Item */
	children: Node,

	/** Class name for the item */
	className?: string,

	/** Set to true to add spacer to top if this item doesn't have a label but will be inline with other items that do. */
	spacerTop?: boolean
}

const FormLayoutItem = (props: FormLayoutItemProps) => {
	const { children, className, spacerTop, ...rest } = props

	return (
		<div
			className={cx('form-layout__item', className, {
				'form-layout__item--spacer-top': spacerTop
			})}
			{...rest}
		>
			{children}
		</div>
	)
}

export default FormLayoutItem
