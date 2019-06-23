// @flow
import React from 'react'
import cx from 'classnames'

export type TextStyleProps = {
	/** Contents of the component. */
	children: Node,

	/** Class name for the component */
	className?: string,

	/** Style type */
	type?: 'strong' | 'emphasis' | 'subdued'
}

const TextStyle = (props: TextStyleProps) => {
	const { children, className, type } = props
	const Element = type === 'strong' ? 'strong' : 'span'
	const classes = cx(className, {
		'text__style--strong': type === 'strong',
		'text__style--emphasis': type === 'emphasis',
		'text__style--subdued': type === 'subdued'
	})
	if (typeof children === 'string') {
		return (
			<Element
				className={classes}
				dangerouslySetInnerHTML={{ __html: children }}
			/>
		)
	}
	return <Element className={classes}>{children}</Element>
}

export default TextStyle
