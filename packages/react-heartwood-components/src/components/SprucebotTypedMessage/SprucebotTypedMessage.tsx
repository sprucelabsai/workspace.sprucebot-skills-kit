import React, { Component } from 'react'
import Typist from 'react-typist'
import { IHWSprucebotTypedMessage } from '@sprucelabs/spruce-types'

import './styles.scss'

export interface ISprucebotTypedMessageProps
	extends Omit<IHWSprucebotTypedMessage, 'id'> {
	/** optional id for view caching */
	id?: String
}

export default class SprucebotTypedMessage extends Component<
	ISprucebotTypedMessageProps
> {
	static defaultProps = {
		startDelayMS: 1000
	}
	buildMarkup = () => {
		const { sentences, startDelayMs } = this.props

		const elements = []

		elements.push(<Typist.Delay ms={startDelayMs} />)

		sentences.forEach(sentence => {
			elements.push(sentence.sentence)
		})

		return elements
	}

	public render() {
		return <Typist>{this.buildMarkup()}</Typist>
	}
}
