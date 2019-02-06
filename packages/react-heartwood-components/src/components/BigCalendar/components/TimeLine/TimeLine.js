// @flow
import React from 'react'
import cx from 'classnames'

type Props = {
	/** .bigcalendar__time-line will preceed your className */
	className?: string
}

const TimeLine = (props: Props) => {
	const { className, ...rest } = props

	return (
		<div className={cx('bigcalendar__time-line', className, {})} {...rest} />
	)
}

export default TimeLine
