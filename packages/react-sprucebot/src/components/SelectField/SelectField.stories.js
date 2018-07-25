import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import SelectField from './SelectField'
import readme from './SelectField.md'

const stories = storiesOf('SelectField', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<SelectField
			input={{ value: '', onChange: () => null }}
			meta={{ touched: false, error: null }}
		/>
	))
)
