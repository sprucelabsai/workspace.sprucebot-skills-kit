import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import TextArea from './TextArea'
import readme from './TextArea.md'

const stories = storiesOf('TextArea', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<TextArea
			input={{ value: '', onChange: () => null }}
			meta={{ touched: false, error: null }}
		/>
	))
)
