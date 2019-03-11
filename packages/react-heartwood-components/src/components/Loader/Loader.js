// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	/* set to true if loader is on a dark background */
	isLight: boolean
}

const Loader = (props: Props) => {
	const { isLight } = props
	return (
		<span className={cx('loader', { 'loader--light': isLight })}>
			<span className="loader__dot" />
			<span className="loader__dot" />
			<span className="loader__dot" />
		</span>
	)
}

Loader.defaultProps = {
	isLight: false
}

export default Loader
