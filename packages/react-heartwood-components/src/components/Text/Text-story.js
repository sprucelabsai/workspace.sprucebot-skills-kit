// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs/react'
import Text, { Span } from './Text'
const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

const options = [
	'a',
	'abbr',
	'blockquote',
	'br',
	'cite',
	'code',
	'data',
	'dd',
	'dl',
	'dt',
	'figcaption',
	'figure',
	'kbd',
	'li',
	'mark',
	'ol',
	'p',
	'pre',
	'q',
	's',
	'span',
	'sub',
	'sup',
	'time',
	'ul'
]

stories
	.add('Text', () => (
		<Text element={select('Element', options, 'p')}>
			{text('children', 'Hello, world')}
		</Text>
	))
	.add('Span', () => (
		<Span element={select('Element', options, 'span')}>
			{text('children', 'Hello, world')}
		</Span>
	))
