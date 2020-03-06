import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import SprucebotAvatar from './SprucebotAvatar'
import {
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'

const stories = storiesOf('SprucebotAvatar', module)

stories.addDecorator(withKnobs)

stories.add('SprucebotAvatar', () => (
	<SprucebotAvatar
		size={select(
			'size',
			{
				['IHWSprucebotAvatarSize.Small']: IHWSprucebotAvatarSize.Small,
				['IHWSprucebotAvatarSize.Medium']: IHWSprucebotAvatarSize.Medium,
				['IHWSprucebotAvatarSize.Large']: IHWSprucebotAvatarSize.Large
			},
			IHWSprucebotAvatarSize.Medium
		)}
		stateOfMind={select(
			'stateOfMind',
			{
				['IHWSprucebotAvatarStateOfMind.Chilling']:
					IHWSprucebotAvatarStateOfMind.Chilling,

				['IHWSprucebotAvatarStateOfMind.Thinking']:
					IHWSprucebotAvatarStateOfMind.Thinking,

				['IHWSprucebotAvatarStateOfMind.Inquisiting']:
					IHWSprucebotAvatarStateOfMind.Inquisiting,

				['IHWSprucebotAvatarStateOfMind.Jamming']:
					IHWSprucebotAvatarStateOfMind.Jamming
			},
			IHWSprucebotAvatarStateOfMind.Chilling
		)}
	/>
))
