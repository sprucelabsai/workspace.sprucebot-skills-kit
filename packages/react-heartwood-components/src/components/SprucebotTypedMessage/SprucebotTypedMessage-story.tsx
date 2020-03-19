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
	IHWSprucebotTypedMessageSize
} from '@sprucelabs/spruce-types'

const stories = storiesOf('SprucebotTypedMessage', module)

stories.addDecorator(withKnobs)

stories.add('SprucebotTypedMessage', () => (
	<SprucebotTypedMessage
		id="typed-message"
		loop={boolean('loop', true)}
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
