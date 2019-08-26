import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import ExampleCard from './index'

const stories = storiesOf('ExampleCard', module)

stories.addDecorator(withKnobs)

stories.add(
	'ExampleCard',
	() => {
		return (
			<ExampleCard
				title={text('title', 'Example Card')}
				text={text('text', 'Hello, World!')}
			/>
		)
	},
	{
		knobs: {
			escapeHTML: false
		}
	}
)
