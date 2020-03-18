import React, { Component } from 'react'
import Typing from './react-typing-animation/Typing'
import {
	IHWSprucebotTypedMessage,
	IHWSprucebotTypedMessageSentence,
	IHWSprucebotAvatar,
	IHWSprucebotTypedMessageSize,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'

import cx from 'classnames'
import compact from 'lodash/compact'

import SprucebotAvatar from '../SprucebotAvatar/SprucebotAvatar'

export interface ISprucebotTypedMessageState {
	sentenceIdxBeingTyped: number
	lastLineNum: number
}

const SIZE_MAP = {
	[IHWSprucebotTypedMessageSize.Small]: IHWSprucebotAvatarSize.Small,
	[IHWSprucebotTypedMessageSize.Medium]: IHWSprucebotAvatarSize.Medium,
	[IHWSprucebotTypedMessageSize.Large]: IHWSprucebotAvatarSize.Large
}

export default class SprucebotTypedMessage extends Component<
	IHWSprucebotTypedMessage,
	ISprucebotTypedMessageState
> {
	static defaultProps = {
		startDelayMs: 1000,
		size: IHWSprucebotTypedMessageSize.Small
	}

	constructor(props: IHWSprucebotTypedMessage) {
		super(props)
		this.state = {
			sentenceIdxBeingTyped: 0,
			lastLineNum: 0
		}
	}

	findFirstUniqueCharacter = (words1: string, words2: string) => {
		for (let i = 0; i < words1.length; i++) {
			if (words1[i] !== words2[i]) {
				return i
			}
		}
		return 0
	}

	buildMarkup = () => {
		const { sentences, startDelayMs, loop } = this.props
		const elements: React.ReactNode[] = []

		if (startDelayMs && startDelayMs > 0) {
			elements.push(<Typing.Delay ms={startDelayMs} key={'start-delay'} />)
		}

		let lastSentence: IHWSprucebotTypedMessageSentence | undefined

		sentences.forEach((sentence, idx) => {
			let startCharacterIdx = 0

			// delete the last words
			if (lastSentence) {
				const firstUniqueIdx = this.findFirstUniqueCharacter(
					sentence.words,
					lastSentence.words
				)

				// how far back should we delete to start typing the next sentence?
				const howManyToDelete = lastSentence.words.length - firstUniqueIdx

				if (howManyToDelete === lastSentence.words.length) {
					// if we are deleting the whole thing, just clear the line entirely
					elements.push(
						<Typing.Reset
							key={`delay-${idx}`}
							delay={lastSentence.endDelayMs}
						/>
					)
				} else {
					startCharacterIdx = firstUniqueIdx

					elements.push(
						<Typing.Backspace
							key={`backspace-${idx}`}
							delay={lastSentence.endDelayMs}
							count={howManyToDelete}
						/>
					)
				}
			}

			elements.push(sentence.words.substr(startCharacterIdx))
			lastSentence = sentence
		})

		if (loop && lastSentence) {
			elements.push(
				<Typing.Backspace
					key={`last-backspace`}
					delay={lastSentence.endDelayMs}
					count={lastSentence.words.length}
				/>
			)
		}

		return elements
	}

	buildAvatar = (): IHWSprucebotAvatar | undefined => {
		const { defaultAvatar, size, sentences } = this.props
		const { sentenceIdxBeingTyped } = this.state

		let avatar

		if (defaultAvatar) {
			avatar = {
				size: size && SIZE_MAP[size],
				...defaultAvatar
			}
		}

		// if this test
		if (
			sentences[sentenceIdxBeingTyped] &&
			sentences[sentenceIdxBeingTyped].avatar
		) {
			avatar = {
				...(avatar || {}),
				...sentences[sentenceIdxBeingTyped].avatar
			}
		}

		return avatar
	}

	handleTyping = (text: string[]) => {
		// to track when the animation has started the next sentence, we need to check when text has a different amonut of elements
		const { sentenceIdxBeingTyped, lastLineNum } = this.state
		const { sentences } = this.props
		const line = compact(text).length - 1

		if (line < 0) {
			this.setState({ lastLineNum: -1 })
			return
		}

		if (lastLineNum !== line) {
			const newIdx =
				sentenceIdxBeingTyped < sentences.length - 1
					? sentenceIdxBeingTyped + 1
					: 0
			this.setState({
				lastLineNum: line,
				sentenceIdxBeingTyped: newIdx
			})
		}
	}

	public render() {
		const { size, loop } = this.props
		const avatar = this.buildAvatar()

		return (
			<div
				className={cx('sprucebot-typed-message', {
					small: size === IHWSprucebotTypedMessageSize.Small,
					medium: size === IHWSprucebotTypedMessageSize.Medium,
					large: size === IHWSprucebotTypedMessageSize.Large
				})}
			>
				{avatar && <SprucebotAvatar {...avatar} />}
				<Typing
					className="typing"
					speed={10}
					loop={loop}
					onAfterType={this.handleTyping}
				>
					{this.buildMarkup()}
				</Typing>
			</div>
		)
	}
}
