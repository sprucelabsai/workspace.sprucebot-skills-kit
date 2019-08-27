// TODO(george): Figure out why icons busts this rule.
/* eslint import/namespace: off */

// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import cx from 'classnames'

import * as icons from '../../icons.js'

export interface IIconProps {
	/** The name of the icon to render. If not found, this will return null. */
	name?: string

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean

	/** Pass a custom icon to use one that isn't keyed to a name */
	customIcon?: any

	/** Optional classname for the icon */
	className?: string
}

const Icon = (props: IIconProps): React.ReactElement => {
	const { name, customIcon, isLineIcon, className, ...rest } = props

	const iconKey = name && name.toLowerCase()

	if (!customIcon && (!name || !icons[iconKey])) {
		console.warn(`<Icon /> could not find an icon with key `, name)
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
