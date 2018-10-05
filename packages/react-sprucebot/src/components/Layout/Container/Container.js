// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	children: React.Node,
	className: ?string,
	size: 'small' | 'medium',
	center: ?boolean
}

const Container = (props: Props) => {
	const { children, className, size, center } = props
	const parentClass = cx('l-container', className, {
		'l-container-small': size === 'small',
		'l-container-medium': size === 'medium'
	})
	return <div className={parentClass}>{props.children}</div>
}

Container.defaultProps = {
	center: false,
	className: ''
}

export default Container
