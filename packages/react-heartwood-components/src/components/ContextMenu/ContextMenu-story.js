import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object, boolean, text } from '@storybook/addon-knobs/react'
import ContextMenu from './ContextMenu'

const stories = storiesOf('Context Menu', module)

stories.addDecorator(withKnobs)

stories.add('Example', () => (
	<div
		style={{
			position: 'relative',
			width: '100vw',
			height: '200vh'
		}}
	>
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0
			}}
		>
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
		</div>
		<div
			style={{
				position: 'absolute',
				top: 0,
				right: 0
			}}
		>
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
		</div>
		<div
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0
			}}
		>
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
		</div>
		<div
			style={{
				position: 'absolute',
				bottom: 0,
				right: 0
			}}
		>
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
		</div>
	</div>
))
