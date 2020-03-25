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
	sentenceQueue: IHWSprucebotTypedMessageSentence[]
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

	typingRef = React.createRef<Typing>()

	constructor(props: IHWSprucebotTypedMessage) {
		super(props)
		this.state = {
			sentenceIdxBeingTyped: 0,
			lastLineNum: 0,
			sentenceQueue: []
		}
	}

	addToTypingQueue = async (sentence: IHWSprucebotTypedMessageSentence) => {
		if (this.typingRef.current) {
			const { sentences } = this.props
			const { sentenceQueue } = this.state

			// add sentence to the queue and re-render of children of Typing
			this.setState({ sentenceQueue: [...sentenceQueue, sentence] })

			// need to calculate delete count or reset
			const all = [...sentences, ...sentenceQueue]
			const last = all.pop()

			let words = sentence.words
			const toAdd: React.ReactNode[] = []

			if (last) {
				const firstUniqueIdx = this.findFirstUniqueCharacter(
					last.words,
					sentence.words
				)

				const howManyToDelete = last.words.length - firstUniqueIdx

				if (firstUniqueIdx === -1) {
					words = words.substr(last.words.length)
				} else if (howManyToDelete < last.words.length) {
					toAdd.push(
						<Typing.Backspace key={`added-backspace`} count={howManyToDelete} />
					)

					words = words.substr(firstUniqueIdx)
				} else {
					toAdd.push(<Typing.Reset key={`added-reset`} />)
				}
			}

			if (words.length > 0) {
				toAdd.push(words)
			}

			return this.typingRef.current.addToTypingQueue(toAdd)
		}
	}

	componentDidUpdate = prevProps => {
		// if paused prop changed at all, it wins (calling play manually starts it again)
		if (prevProps.paused !== this.props.paused) {
			switch (this.props.paused) {
				case true:
					this.pause()
					break
				default:
					this.play()
			}
		}
	}

	pause = async () => {
		return this.typingRef.current && this.typingRef.current.pause()
	}

	play = async () => {
		return this.typingRef.current && this.typingRef.current.play()
	}

	reset = async () => {
		return this.typingRef.current && this.typingRef.current.reset()
	}

	findFirstUniqueCharacter = (words1: string, words2: string) => {
		for (let i = 0; i < words1.length; i++) {
			if (words1[i] !== words2[i]) {
				return i
			}
		}
		return -1
	}

	buildMarkup = () => {
		const { sentences, startDelayMs, loop } = this.props
		const { sentenceQueue } = this.state
		const elements: React.ReactNode[] = []

		if (startDelayMs && startDelayMs > 0) {
			elements.push(<Typing.Delay ms={startDelayMs} key={'start-delay'} />)
		}

		let lastSentence: IHWSprucebotTypedMessageSentence | undefined
		;[...sentences, ...sentenceQueue].forEach((sentence, idx) => {
			let startCharacterIdx = 0

			// delete the last words
			if (lastSentence) {
				const firstUniqueIdx = this.findFirstUniqueCharacter(
					sentence.words,
					lastSentence.words
				)

				// how far back should we delete to start typing the next sentence?
				const howManyToDelete = lastSentence.words.length - firstUniqueIdx

				// the next sentence was additive so only add the characters that are new
				if (firstUniqueIdx === -1) {
					startCharacterIdx = lastSentence.words.length
				} else if (howManyToDelete === lastSentence.words.length) {
					// if we are deleting the whole thing, just clear the line entirely
					elements.push(
						<Typing.Reset
							key={`reset-${idx}`}
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
			elements.push(<Typing.Reset key="final-reset" />)
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
		const { size, loop, paused } = this.props
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
					ref={this.typingRef}
					className="typing"
					speed={10}
					loop={loop}
					onAfterType={this.handleTyping}
					beginTypingOnMount={!paused}
				>
					{this.buildMarkup()}
				</Typing>
			</div>
		)
	}
}
