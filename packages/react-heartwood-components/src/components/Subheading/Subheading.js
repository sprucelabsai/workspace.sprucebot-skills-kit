// @flow
import React from 'react'
import cx from 'classnames'
import { HeadingTagName } from '../Heading/Heading'

export type TextProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Wrapping element to use for the subheading */
	element?: HeadingTagName
}

const Subheading = (props: HeadingProps) => {
	const { children, className, element: Element } = props
	if (typeof children === 'string') {
		return (
			<Element
				className={cx('subheading', className)}
				dangerouslySetInnerHTML={{ __html: children }}
			/>
		)
	}
	return <Element className={cx('subheading', className)}>{children}</Element>
}

Subheading.defaultProps = {
	element: 'h2'
}

export default Subheading
