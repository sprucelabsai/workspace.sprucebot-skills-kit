// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import BotText from './BotText'

const stories = storiesOf('Bot Text', module)

stories.addDecorator(withKnobs)

stories.add('Bot Text', () => (
	<Container size="small">
		<BotText
			text={text('text', 'Hey there from Sprucebot 🌲🤖')}
			className={text('className', '')}
		/>
	</Container>
))
