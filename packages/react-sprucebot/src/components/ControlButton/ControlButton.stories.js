import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import LinkPile from '../LinkPile/LinkPile'
import ControlButton from './ControlButton'
import readme from './ControlButton.md'

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
			<LinkPile>
				<ControlButton
					onClick={action('ControlButton onClick')}
				>{`Control all the buttons!`}</ControlButton>
				<ControlButton
					iconLeft={text('Left Icon', 'edit')}
					onClick={action('ControlButton onClick')}
				>{`I have a left icon`}</ControlButton>
				<ControlButton
					iconLeft={text('Left Icon', 'edit')}
					iconRight={text('Right Icon', 'favorite')}
					onClick={action('ControlButton onClick')}
				>{`I have a right Icon`}</ControlButton>
				<ControlButton
					iconRight={text('Rigth Icon', '🤖')}
					href={text('Link href', 'https://sprucebot.com')}
					onClick={action('Link onClick')}
				>{`I'm a link!`}</ControlButton>
			</LinkPile>
		))
	)
)
