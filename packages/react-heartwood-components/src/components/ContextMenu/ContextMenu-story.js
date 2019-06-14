import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object, boolean, text } from '@storybook/addon-knobs/react'
import ContextMenu from './ContextMenu'

const stories = storiesOf('Context Menu', module)

stories.addDecorator(withKnobs)

stories.add('Example', () => (
	<ContextMenu
		actions={object('actions', [
			{ text: 'Rebook' },
			{ text: 'Cancel appointment' },
			{ text: 'Ask for feedback' }
		])}
		isRightAligned={boolean('isRightAligned', false)}
		isBottomAligned={boolean('isBottomAligned', false)}
		size={text('size', 'large')}
		isSimple={boolean('isSimple', false)}
		isSmall={boolean('isSmall', false)}
	/>
))
