// @flow
// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import cx from 'classnames'

import * as icons from '../../icons.js'

export type Props = {
	/** The name of the icon to render. If not found, this will return null. */
	icon: string,

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean,

	customIcon?: any,

	className?: string
}

const Icon = (props: Props) => {
	const { icon, customIcon, isLineIcon, className, ...rest } = props

	if (!customIcon && (!icon || !icons[icon.toLowerCase()])) {
		console.warn(`<Icon /> could not find an icon with key ${icon}.`)
		return null
	}
	const Handler = customIcon || icons[icon.toLowerCase()]

	return (
		<Handler
			className={cx(className, {
				'u-icon__no-fill': isLineIcon,
				'u-icon__stroke': isLineIcon
			})}
			{...rest}
		/>
	)
}

export default Icon
