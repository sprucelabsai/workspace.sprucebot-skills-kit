// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import TextStyle from './TextStyle'
const stories = storiesOf('TextStyle', module)

stories.addDecorator(withKnobs)

stories
	.add('Text Style - Strong', () => (
		<TextStyle type="strong">{text('children', 'Hello, world')}</TextStyle>
	))
	.add('Text Style - Emphasis', () => (
		<TextStyle type="emphasis">{text('children', 'Hello, world')}</TextStyle>
	))
	.add('Text Style - Subdued', () => (
		<TextStyle type="subdued">{text('children', 'Hello, world')}</TextStyle>
	))
