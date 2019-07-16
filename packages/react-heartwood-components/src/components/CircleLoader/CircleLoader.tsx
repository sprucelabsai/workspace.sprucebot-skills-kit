import React from 'react'
import cx from 'classnames'

export interface ICircleLoaderProps {
	/** Optional; makes the loader white instead of primary color */
	light?: boolean
}

const CircleLoader = (props: ICircleLoaderProps): React.ReactElement => {
	const { light } = props
	return (
		<div
			className={cx('circle-loader', {
				'circle-loader--light': light
			})}
		>
			<div />
		</div>
	)
}

CircleLoader.defaultProps = {
	light: false
}

export default CircleLoader
