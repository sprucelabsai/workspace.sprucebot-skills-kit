// TODO(george): Figure out why icons busts this rule.
/* eslint import/namespace: off */

// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React, { Fragment } from 'react'
import cx from 'classnames'

import * as icons from '../../icons.js'
import { IHWIcon } from '@sprucelabs/spruce-types'

export interface IIconProps extends Omit<IHWIcon, 'id'> {
	/** Optional id for view caching */
	id?: string

	/** Pass a custom icon to use one that isn't keyed to a name */
	customIcon?: any

	/** Optional classname for the icon */
	className?: string
}

const Icon = (props: IIconProps): React.ReactElement => {
	const { name: icon, customIcon, isLineIcon, className, ...rest } = props

	const iconKey = icon && icon.toLowerCase()

	if (!customIcon && (!icon || !icons[iconKey])) {
		console.warn(`<Icon /> could not find an icon with key `, icon)
		return <Fragment />
	}

	const isFillIcon = !customIcon && icons[iconKey] && !icons[iconKey].isLineIcon

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
