// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

const stories = storiesOf('FontLoader', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
	<div>
		<h1>Hello, are you a UFO?</h1>
	</div>
))
