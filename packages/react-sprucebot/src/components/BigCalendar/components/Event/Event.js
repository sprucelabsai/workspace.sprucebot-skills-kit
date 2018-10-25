// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import EventBlock from ../EventBlock/EventBlock

type Props = {
    event: Object,
    users: Array<Object>,
	children?: Node,
	className?: string
}

const Event = (props: Props) => {
	return <p>I'm an event</p>
}

export default Event
