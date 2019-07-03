import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import SplitButton from './SplitButton'

const actions = [
	{
		text: 'Another action'
	},
	{
		text: 'Third action'
	},
	{
		text: 'Yet another action'
	}
]

const stories = storiesOf('SplitButton', module)

stories.addDecorator(withKnobs)

stories
	.add('Primary', () => (
		<SplitButton
			defaultAction={{
				text: text('defaultActionText', 'Do the default action')
			}}
			actions={actions}
			kind="primary"
		/>
	))
	.add('Primary Small', () => (
		<SplitButton
			defaultAction={{
				text: text('defaultActionText', 'Do the default action')
			}}
			actions={actions}
			kind="primary"
			isSmall
		/>
	))
	.add('Secondary', () => (
		<SplitButton
			defaultAction={{
				text: text('defaultActionText', 'Do the default action')
			}}
			actions={actions}
			kind="secondary"
		/>
	))
	.add('Secondary Small', () => (
		<SplitButton
			defaultAction={{
				text: text('defaultActionText', 'Do the default action')
			}}
			actions={actions}
			kind="secondary"
			isSmall
		/>
	))
