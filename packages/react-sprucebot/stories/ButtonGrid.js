import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import { GridButton, ButtonGrid } from '../lib/components/ButtonGrid/ButtonGrid'
import readme from './docs/ButtonGrid.md'

const stories = storiesOf('ButtonGrid', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<ButtonGrid>
					<GridButton
						selected={boolean('Select Option 1', false)}
						subtitle="It's good"
						onClick={action('Select tile')}
					>
						Option 1
					</GridButton>
					<GridButton
						selected={boolean('Select Option 2', false)}
						subtitle="It's better!"
						onClick={action('Select tile')}
					>
						Option 2
					</GridButton>
					<GridButton
						selected={boolean('Select Option 3', true)}
						subtitle="Def worth a look"
						onClick={action('Select tile')}
					>
						Option 3
					</GridButton>
				</ButtonGrid>

				<ButtonGrid>
					<GridButton
						selected={boolean('Select 🤖', true)}
						onClick={action('Select tile')}
					>
						🤖
					</GridButton>
					<GridButton
						selected={boolean('Select 🔥 #1', false)}
						onClick={action('Select tile')}
					>
						🔥
					</GridButton>
					<GridButton
						selected={boolean('Select 🔥 #2', false)}
						onClick={action('Select tile')}
					>
						🔥
					</GridButton>
					<GridButton
						selected={boolean('Select 🌲', true)}
						onClick={action('Select tile')}
					>
						🌲
					</GridButton>
				</ButtonGrid>
			</div>
		))
	)
)
