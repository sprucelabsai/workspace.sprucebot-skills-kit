// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'

type Props = {}

const TimeLine = (props: Props) => {
	const { className, ...rest } = props

	return (
		<div className={cx('bigcalendar__time-line', className, {})} {...rest} />
	)
}

export default TimeLine