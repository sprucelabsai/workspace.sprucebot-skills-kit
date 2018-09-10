import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Button from './Button'
import readme from './Button.md'

const stories = storiesOf('Button', module)

stories.addDecorator(story => (
	<div style={{ width: '500px', margin: 'auto' }}>{story()}</div>
))
stories.addDecorator(withKnobs)

stories
	.add(
		'Primary',
		withReadme(
			readme,
			withInfo()(() => (
				<Button
					primary
					disabled={boolean('Disabled', false)}
					busy={boolean('Busy', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Primary Button 😀🌲🤖')}
				</Button>
			))
		)
	)
	.add(
		'Secondary',
		withReadme(
			readme,
			withInfo()(() => (
				<Button
					secondary
					disabled={boolean('Disabled', false)}
					busy={boolean('Busy', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Secondary Button')}
				</Button>
			))
		)
	)
	.add(
		'Alt',
		withReadme(
			readme,
			withInfo()(() => (
				<Button
					alt
					disabled={boolean('Disabled', false)}
					busy={boolean('Busy', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Alt Button')}
				</Button>
			))
		)
	)
	.add(
		'Caution',
		withReadme(
			readme,
			withInfo()(() => (
				<Button
					primary
					caution
					disabled={boolean('Disabled', false)}
					busy={boolean('Busy', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Take Me To The Danger Zone')}
				</Button>
			))
		)
	)
	.add(
		'Toggle',
		withReadme(
			readme,
			withInfo()(() => (
				<Button toggle onClick={action('Button onClick')}>
					{text('Button Text', 'Toggle Button')}
				</Button>
			))
		)
	)
	.add(
		'Remove',
		withReadme(
			readme,
			withInfo()(() => (
				<Button
					primary
					remove
					disabled={boolean('Disabled', false)}
					busy={boolean('Busy', false)}
					onClick={action('Button onClick')}
				>
					{text('Button Text', 'Toggle Button')}
				</Button>
			))
		)
	)
