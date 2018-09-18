// @flow
import React, { Component } from 'react'

import type { Node } from 'react'

type Props = {
	children?: Node
}
export default class BotText extends Component<Props> {
	render() {
		const { children } = this.props
		return <div className="bot__text">{children}</div>
	}
}
