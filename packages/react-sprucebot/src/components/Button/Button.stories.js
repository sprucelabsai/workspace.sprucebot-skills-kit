import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Button from './Button'
import readme from './Button.md'

const stories = storiesOf('Button', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<Button
					primary={boolean('primary', false)}
					secondary={boolean('secondary', false)}
					caution={boolean('caution', false)}
					alt={boolean('alt', false)}
					busy={boolean('busy', false)}
					remove={boolean('remove', false)}
					toggle={boolean('toggle', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Happy Button 😀🌲🤖')}
				</Button>
			</div>
		))
	)
)
