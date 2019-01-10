// @flow
import React, { Component } from 'react'
import cx from 'classnames'

export type Props = {}

type State = {}

export default class SaveBar extends React.PureComponent<Props, State> {
	state = {}

	static defaultProps = {}

	render() {
		const { ...rest } = this.state
		const { ...rest } = this.props
		const classes = cx('')

		return <div className={classes}>{}</div>
	}
}
