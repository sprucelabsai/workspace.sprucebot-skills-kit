import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Select from './Select'
import readme from './Select.md'

const stories = storiesOf('Select', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<Select>
			<option>Option 1</option>
			<option>Option 2</option>
			<option>Option 3</option>
		</Select>
	))
)
