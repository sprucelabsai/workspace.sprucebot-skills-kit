// @flow
import React, { Component } from 'react'
import cx from 'classnames'

type Props = {
	text?: string,
	children?: Node,
	className?: string
}

const EventBlock = (props: Props) => {
	return <p>I'm an event block</p>
}

export default EventBlock
