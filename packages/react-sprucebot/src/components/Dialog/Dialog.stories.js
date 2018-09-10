import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Dialog from './Dialog'
import readme from './Dialog.md'

const stories = storiesOf('Dialog', module)
stories.addDecorator(withKnobs)

stories
	.add(
		'Default',
		withReadme(
			readme,
			withInfo()(() => (
				<Dialog onTapClose={action('Dialog onTapClose')}>
					{'Dialog content goes here.'}
				</Dialog>
			))
		)
	)
	.add(
		'With Title',
		withReadme(
			readme,
			withInfo()(() => (
				<Dialog title="I'm a Dialog" onTapClose={action('Dialog onTapClose')}>
					{'Dialog content goes here.'}
				</Dialog>
			))
		)
	)
