import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Container from '../lib/components/Container/Container'
import ControlButton from '../lib/components/ControlButton/ControlButton'
import readme from './docs/ControlButton.md'

const iconOptions = {
	null: 'None',
	favorite: 'Favorite',
	edit: 'Edit',
	close: 'Close',
	keyboard_arrow_up: 'Up',
	keyboard_arrow_down: 'Down',
	chevron_left: 'Left',
	chevron_right: 'Right',
	'🤖': 'Bot'
}

const defaultIcon = 'null'

const stories = storiesOf('ControlButton', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<ControlButton
					iconLeft={text('Left Icon', 'edit')}
					iconRight={text('Right Icon', 'favorite')}
					onClick={action('Button onClick')}
				>{`Control all the buttons!`}</ControlButton>
			</div>
		))
	)
)
