import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object, boolean, text } from '@storybook/addon-knobs/react'
import ContextMenu from './ContextMenu'

const stories = storiesOf('Context Menu', module)

stories.addDecorator(withKnobs)

stories.add('Example', () => (
	<ContextMenu
		actions={object('actions', [{ text: 'one' }])}
		isLeftAligned={boolean('isLeftAligned', true)}
		size={text('size', '')}
		isSimple={boolean('isSimple', false)}
	/>
))
