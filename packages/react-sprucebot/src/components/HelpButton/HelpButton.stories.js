import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import HelpButton from './HelpButton'
import readme from './HelpButton.md'

const stories = storiesOf('HelpButton', module)
stories.addDecorator(withKnobs)

stories.add(
	'Default',
	withReadme(
		readme,
		withInfo()(() => <HelpButton title="Help Me!" body="Pleeeeeease." />)
	)
)
