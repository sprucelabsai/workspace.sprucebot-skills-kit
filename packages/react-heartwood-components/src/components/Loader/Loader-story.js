import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import Loader from './Loader'

const stories = storiesOf('Loader', module)

stories.addDecorator(withKnobs)

stories.add('Loader', () => {
	const isLight = boolean('isLight', false)
	return (
		<div
			style={{
				backgroundColor: isLight ? 'black' : 'transparent',
				padding: '2rem'
			}}
		>
			<Loader isLight={isLight} />
		</div>
	)
})
