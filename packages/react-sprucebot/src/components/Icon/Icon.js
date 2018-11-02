// @flow
// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import cx from 'classnames'

import Add from '../../../static/assets/icons/ic_add_circle_outline.svg'
import CalendarDate from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import Close from '../../../static/assets/icons/ic_close.svg'
import Delete from '../../../static/assets/icons/Interface-Essential/Delete/bin.svg'
import Edit from '../../../static/assets//icons/Interface-Essential/Edit/pencil-write.svg'

type Props = {
	/** The name of the icon to render. If not found, this will return null. */
	icon: string,

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean
}

const key = {
	add: Add,
	close: Close,
	date: CalendarDate,
	delete: Delete,
	edit: Edit
}

const Icon = (props: Props) => {
	const { icon, isLineIcon, ...rest } = props

	if (!icon || !key[icon.toLowerCase()]) {
		// TODO: handle logging
		// console.error(`<Icon /> could not find an icon with key ${icon}`)
		return null
	}
	const Handler = key[icon.toLowerCase()]

	return (
		<Handler
			className={cx({
				'u-icon__no-fill': isLineIcon,
				'u-icon__stroke': isLineIcon
			})}
			{...rest}
		/>
	)
}

export default Icon
