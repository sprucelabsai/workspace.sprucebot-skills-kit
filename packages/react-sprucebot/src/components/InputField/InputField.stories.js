import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import InputField from './InputField'
import readme from './InputField.md'

const stories = storiesOf('InputField', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<InputField
			label="Email Address"
			input={{ value: '', onChange: () => null }}
			meta={{ touched: false, error: null }}
		/>
	))
)
