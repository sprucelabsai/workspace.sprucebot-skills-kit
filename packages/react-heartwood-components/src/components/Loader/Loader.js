// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	/* set to true if loader is on a dark background */
	isLight: boolean,

	/* set to true if loader should be centered within parent */
	isCentered: boolean
}

const Loader = (props: Props) => {
	const { isLight, isCentered, ...rest } = props
	return (
		<span
			className={cx('loader', {
				'loader--light': isLight,
				'loader--centered': isCentered
			})}
			{...rest}
		>
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
