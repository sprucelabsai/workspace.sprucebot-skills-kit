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

stories
	.add(
		'Primary',
		withReadme(
			readme,
			withInfo()(() => (
				<Button primary onClick={action('Button onClick')}>
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
				<Button secondary onClick={action('Button onClick')}>
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
				<Button alt onClick={action('Button onClick')}>
					{text('Button Text', 'Alt Button')}
				</Button>
			))
		)
	)
	.add(
		'Disabled',
		withReadme(
			readme,
			withInfo()(() => (
				<div>
					<Button primary disabled onClick={action('Button onClick')}>
						{text('Button Text', 'Primary Button Disabled')}
					</Button>
					<Button alt disabled onClick={action('Button onClick')}>
						{text('Button Text', 'Secondary Button Disabled')}
					</Button>
				</div>
			))
		)
	)
	.add(
		'Caution',
		withReadme(
			readme,
			withInfo()(() => (
				<Button primary caution onClick={action('Button onClick')}>
					{text('Button Text', 'Take Me To The Danger Zone')}
				</Button>
			))
		)
	)
	.add(
		'Tertiary',
		withReadme(
			readme,
			withInfo()(() => (
				<Button tertiary onClick={action('Button onClick')}>
					{text('Button Text', 'Minor Button')}
				</Button>
			))
		)
	)
	.add(
		'Loading',
		withReadme(
			readme,
			withInfo()(() => (
				<div>
					<Button primary busy onClick={action('Button onClick')}>
						{text('Button Text', 'Primary Button Disabled')}
					</Button>
					<Button alt busy onClick={action('Button onClick')}>
						{text('Button Text', 'Secondary Button Disabled')}
					</Button>
				</div>
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
				<Button primary remove onClick={action('Button onClick')}>
					{text('Button Text', 'Toggle Button')}
				</Button>
			))
		)
	)
