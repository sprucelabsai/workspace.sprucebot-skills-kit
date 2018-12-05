// @flow
import React from 'react'
import cx from 'classnames'

export type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export type TextProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Wrapping element to use for the heading */
	element?: HeadingTagName
}

const Heading = (props: HeadingProps) => {
	const { children, className, element: Element } = props
	if (typeof children === 'string') {
		return (
			<Element
				className={cx('heading', className)}
				dangerouslySetInnerHTML={{ __html: children }}
			/>
		)
	}
	return <Element className={cx('heading', className)}>{children}</Element>
}

Heading.defaultProps = {
	element: 'h2'
}

export default Heading
