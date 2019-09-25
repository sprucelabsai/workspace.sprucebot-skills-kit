// @flow
import React from 'react'
import cx from 'classnames'
import { IHWHeading, IHWHeadingWeight } from '@sprucelabs/spruce-types'

export interface IHeadingProps extends Omit<IHWHeading, 'id'> {
	/** id for view caching */
	id?: string

	/** classname */
	className?: string

	/** any children (dropped in after whatever is in text prop) */
	children?: React.ReactNode
}

const Heading = (props: IHeadingProps): React.ReactElement => {
	const { text, className, weight, children } = props

	const Element = weight || IHWHeadingWeight.H2

	return (
		<Element
			className={cx('heading', className)}
			dangerouslySetInnerHTML={text ? { __html: text } : undefined}
		>
			{children}
		</Element>
	)
}

export default Heading
