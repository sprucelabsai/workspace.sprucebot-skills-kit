// TODO(george): Figure out why icons busts this rule.
/* eslint import/namespace: off */

// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import cx from 'classnames'

import * as icons from '../../icons.js'

export interface IIconProps {
	/** The name of the icon to render. If not found, this will return null. */
	icon?: string

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean

	customIcon?: any

	className?: string
}

const Icon = (props: IIconProps): React.ReactElement => {
	const { icon, customIcon, isLineIcon, className, ...rest } = props

	const iconKey = icon && icon.toLowerCase()

	if (!customIcon && (!icon || !icons[iconKey])) {
		console.warn(`<Icon /> could not find an icon with key `, icon)
		return null
	}

	let isFillIcon = !customIcon && icons[iconKey] && !icons[iconKey].isLineIcon

	const Handler = customIcon || icons[iconKey].icon

	return (
		<Handler
			className={cx(className, 'icon', {
				'icon--no-fill':
					typeof isLineIcon !== 'undefined' ? isLineIcon : !isFillIcon,
				'icon--stroke':
					typeof isLineIcon !== 'undefined' ? isLineIcon : !isFillIcon
			})}
			{...rest}
		/>
	)
}

export default Icon
