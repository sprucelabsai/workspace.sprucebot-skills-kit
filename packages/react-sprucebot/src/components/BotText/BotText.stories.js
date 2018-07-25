import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import { withInfo } from '@storybook/addon-info'
import BotText from './BotText'
import readme from './BotText.md'

const stories = storiesOf('BotText', module)

stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<BotText>{text('BotText', 'Hey there from Sprucebot 🌲🤖')}</BotText>
		))
	)
)
