import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	object,
	boolean,
	number,
	select
} from '@storybook/addon-knobs'
import SprucebotTypedMessage from './SprucebotTypedMessage'
import {
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotTypedMessageSize,
	IHWButtonKinds,
	IHWSprucebotTypedMessageSentence
} from '@sprucelabs/spruce-types'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import { TextInput } from '../Forms'
import Card, { CardBody, CardFooter } from '../Card'
import { Page, Layout } from '../..'

const stories = storiesOf('SprucebotTypedMessage', module)

stories.addDecorator(withKnobs)

stories.add('SprucebotTypedMessage', () => (
	<SprucebotTypedMessage
		id="typed-message"
		loop={boolean('loop', true)}
		paused={boolean('paused', false)}
		size={select(
			'size',
			{
				['IHWSprucebotTypedMessageSize.Small']:
					IHWSprucebotTypedMessageSize.Small,
				['IHWSprucebotTypedMessageSize.Medium']:
					IHWSprucebotTypedMessageSize.Medium,
				['IHWSprucebotTypedMessageSize.Large']:
					IHWSprucebotTypedMessageSize.Large
			},
			IHWSprucebotTypedMessageSize.Medium
		)}
		startDelayMs={number('startDelayMs', 1000)}
		defaultAvatar={object('defaultAvatar', {
			id: 'default-avatar',
			stateOfMind: IHWSprucebotAvatarStateOfMind.Chill
		})}
		sentences={[
			object('sentences[0]', {
				words: 'Hey there! How are you?',
				endDelayMs: 2000
			}),
			object('sentences[1]', {
				words: 'Hey there! Wait, before you answer that I wanted to say...',
				endDelayMs: 4000
			}),
			object('sentences[2]', {
				words: 'Experience!!',
				endDelayMs: 2500
			})
		]}
	/>
))

interface IMessageControllerProps {}

interface IMessageControllerState {
	playing: boolean
}

class MessageController extends React.Component<
	IMessageControllerProps,
	IMessageControllerState
> {
	messageRef = React.createRef<SprucebotTypedMessage>()

	constructor(props: IMessageControllerState) {
		super(props)
		this.state = {
			playing: true
		}
	}

	play = () => {
		this.setState({ playing: true })
		this.messageRef.current && this.messageRef.current.play()
	}

	pause = () => {
		this.setState({ playing: false })
		this.messageRef.current && this.messageRef.current.pause()
	}

	reset = () => {
		this.messageRef.current && this.messageRef.current.reset()
	}

	public render(): React.ReactElement {
		const { playing } = this.state
		return (
			<>
				<SprucebotTypedMessage
					ref={this.messageRef}
					id={'controlled'}
					loop={true}
					size={IHWSprucebotTypedMessageSize.Large}
					defaultAvatar={{
						id: 'avatar',
						stateOfMind: IHWSprucebotAvatarStateOfMind.Chill
					}}
					sentences={[
						{
							words: 'this is the first sentence',
							endDelayMs: 2000
						},
						{
							words: 'this is the second sentence',
							endDelayMs: 2000
						},
						{
							words: 'this is the third sentence',
							endDelayMs: 2000
						}
					]}
				/>
				<div className="controls">
					<ButtonGroup
						actions={[
							{
								text: 'Play',
								kind: playing
									? IHWButtonKinds.Primary
									: IHWButtonKinds.Secondary,
								htmlAttributes: {
									onClick: this.play
								}
							},
							{
								text: 'Pause',
								kind: !playing
									? IHWButtonKinds.Primary
									: IHWButtonKinds.Secondary,
								htmlAttributes: {
									onClick: this.pause
								}
							},
							{
								text: 'Reset',
								kind: IHWButtonKinds.Secondary,
								htmlAttributes: {
									onClick: this.reset
								}
							}
						]}
					/>
				</div>
			</>
		)
	}
}

stories.add('Controlling Typed Message', () => <MessageController />)

interface IAddSentenceControllerProps {}
interface IAddSentenceControllerState {
	nextSentence: string
	sentences: IHWSprucebotTypedMessageSentence[]
}

class AddSentenceController extends React.Component<
	IAddSentenceControllerProps,
	IAddSentenceControllerState
> {
	messageRef = React.createRef<SprucebotTypedMessage>()

	constructor(props: IMessageControllerState) {
		super(props)
		this.state = {
			nextSentence: 'this is the next sentence',
			sentences: [
				{
					words: 'this is the first sentence'
				}
			]
		}
	}

	addSentence = async () => {
		const { nextSentence } = this.state

		if (this.messageRef.current) {
			await this.messageRef.current.addToTypingQueue({
				words: nextSentence
			})

			this.messageRef.current.play()
		}
	}

	public render(): React.ReactElement {
		const { nextSentence, sentences } = this.state
		return (
			<>
				<SprucebotTypedMessage
					ref={this.messageRef}
					id={'controlled'}
					loop={false}
					size={IHWSprucebotTypedMessageSize.Large}
					defaultAvatar={{
						id: 'avatar',
						stateOfMind: IHWSprucebotAvatarStateOfMind.Chill
					}}
					sentences={sentences}
				/>
				<Card>
					<CardBody>
						<TextInput
							id="next-sentence"
							label={'next sentence'}
							onChange={e =>
								this.setState({
									nextSentence: (e.target as HTMLInputElement).value
								})
							}
							value={nextSentence}
						/>
					</CardBody>
					<CardFooter>
						<ButtonGroup
							actions={[
								{
									text: 'Add sentence',
									kind: IHWButtonKinds.Primary,
									htmlAttributes: {
										onClick: this.addSentence
									}
								}
							]}
						/>
					</CardFooter>
				</Card>
			</>
		)
	}
}

stories.add('Add Sentence', () => (
	<Page>
		<Page.Content>
			<Layout>
				<Layout.Section>
					<AddSentenceController />
				</Layout.Section>
			</Layout>
		</Page.Content>
	</Page>
))
