import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import BotText from './BotText'

const stories = storiesOf('Bot Text', module)

stories.addDecorator(withKnobs)

stories.add('Bot Text', () => (
	<BotText
		text={text('text', 'Hey there from Sprucebot 🌲🤖')}
		className={text('className', '')}
	/>
))
