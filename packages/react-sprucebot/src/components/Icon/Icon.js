// @flow
// NOTE: This component should only include a few of the most commonly
// used icons for developer convenience
import React from 'react'
import Edit from '../../../static/assets//icons/Interface-Essential/Edit/pencil-write.svg'
import CalendarDate from '../../../static/assets/icons/Interface-Essential/Date/Calendar/calendar-date.svg'
import Delete from '../../../static/assets/icons/Interface-Essential/Delete/bin.svg'
import Close from '../../../static/assets/icons/ic_close.svg'

type Props = {
	icon: string
}

const key = {
	close: Close,
	date: CalendarDate,
	delete: Delete,
	edit: Edit
}

const Icon = (props: Props) => {
	const { icon, ...rest } = props

	if (!icon || !key[icon.toLowerCase()]) {
		return null
	}
	const Handler = key[icon.toLowerCase()]

	return <Handler {...rest} />
}

export default Icon
