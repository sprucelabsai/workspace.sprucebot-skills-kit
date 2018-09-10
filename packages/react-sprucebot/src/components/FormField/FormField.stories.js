import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import FormField from './FormField'
import readme from './FormField.md'

const stories = storiesOf('FormField', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<FormField
				input={{ value: '', onChange: () => null }}
				meta={{ touched: false, error: null }}
				type="text"
				label="Email Address"
				placeholder="hello@sprucebot.com"
			>
				<input
					type="text"
					label="Email Address"
					placeholder="hello@sprucebot.com"
				/>
			</FormField>
		))
	)
)
