import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
import SprucebotTypedMessage from './SprucebotTypedMessage'
import {
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'

const stories = storiesOf('SprucebotTypedMessage', module)

stories.addDecorator(withKnobs)

stories.add('SprucebotTypedMessage', () => (
	<SprucebotTypedMessage
		loop={boolean('loop', false)}
		defaultAvatar={object('defaultAvatar', {
			id: 'default-avatar',
			stateOfMind: IHWSprucebotAvatarStateOfMind.Chilling,
			size: IHWSprucebotAvatarSize.Medium
		})}
		sentences={[
			object('sentences[0]', {
				sentence: 'Hey there! How are you?',
				endDelayMs: 1000
			}),
			object('sentences[1]', {
				sentence: 'Hey there! Wait, before you answer that I wanted to say!',
				endDelayMs: 2000
			}),
			object('sentences[2]', {
				sentence: 'Experience!!'
			})
		]}
	/>
))
