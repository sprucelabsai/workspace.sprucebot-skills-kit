// @flow
// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import cx from 'classnames'

import Add from '../../../static/assets/icons/ic_add_circle_outline.svg'
import CalendarDate from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import Close from '../../../static/assets/icons/ic_close.svg'
import Delete from '../../../static/assets/icons/Interface-Essential/Delete/bin.svg'
import Edit from '../../../static/assets/icons/Interface-Essential/Edit/pencil-write.svg'
import RadioUnchecked from '../../../static/assets/icons/ic_radio_button_unchecked.svg'
import PaymentFailedSolid from '../../../static/assets/icons/ic_payment_failed_solid.svg'
import PaymentSuccessSolid from '../../../static/assets/icons/ic_payment_success_solid.svg'
import CheckCircle from '../../../static/assets/icons/ic_check_circle.svg'
import Late from '../../../static/assets/icons/ic_late.svg'
import Disable from '../../../static/assets/icons/ic_disable.svg'
import Teammates from '../../../static/assets/icons/ic_teammates.svg'

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
	edit: Edit,
	radio_button_unchecked: RadioUnchecked,
	payment_failed_solid: PaymentFailedSolid,
	checked_cicrle: CheckCircle,
	late: Late,
	payment_success_solid: PaymentSuccessSolid,
	disable: Disable,
	teammates: Teammates
}

const Icon = (props: Props) => {
	const { icon, customIcon, isLineIcon, className, ...rest } = props

	if (!customIcon && (!icon || !key[icon.toLowerCase()])) {
		log.warn(`<Icon /> could not find an icon with key ${icon}`)
		return null
	}
	const Handler = customIcon || key[icon.toLowerCase()]

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
