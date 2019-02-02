// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'

export type BigSearchBodyProps = {
	/** Children to show in the view */
	children?: Node,

	/** Optional class name */
	className?: string
}

const BigSearchBody = (props: BigSearchBodyProps) => {
	const { children, className } = props
	return (
		<div className={cx('big-search__view-body', className)}>
			{children && children}
		</div>
	)
}

export default BigSearchBody
