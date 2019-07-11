// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs/react'
import ButtonGroup from './ButtonGroup'

const stories = storiesOf('ButtonGroup', module)

stories.addDecorator(withKnobs)

stories.add('Button Group', () => (
	<ButtonGroup
		kind={text('kind', '')}
		actions={object('actions', [
			{ text: 'Confirm Changes', kind: 'primary' },
			{ text: 'Cancel', kind: 'secondary' }
		])}
	/>
))
