import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'
import Text, { Span, ITextProps } from './Text'
const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

const options: Record<string, ITextProps['element']> = {
	a: 'a',
	abbr: 'abbr',
	blockquote: 'blockquote',
	br: 'br',
	cite: 'cite',
	code: 'code',
	data: 'data',
	dd: 'dd',
	dl: 'dl',
	dt: 'dt',
	figcaption: 'figcaption',
	figure: 'figure',
	kbd: 'kbd',
	li: 'li',
	mark: 'mark',
	ol: 'ol',
	p: 'p',
	pre: 'pre',
	q: 'q',
	s: 's',
	span: 'span',
	sub: 'sub',
	sup: 'sup',
	time: 'time',
	ul: 'ul'
}

stories
	.add('Text', () => (
		<Text
			element={select<ITextProps['element']>('Element', options, 'p')}
			context={object('Context', {
				planet: {
					text: 'World!',
					type: 'style',
					props: { type: 'strong' }
				},
				link: {
					text: 'Click me!',
					type: 'button',
					props: { href: 'https://www.spruce.ai' }
				}
			})}
		>
			{text('children', 'Hello, {{planet}}! {{link}}')}
		</Text>
	))
	.add('Span', () => (
		<Span
			element={select('Element', options, 'span')}
			context={object('Context', {
				planet: {
					text: 'World!',
					type: 'style',
					props: { type: 'strong' }
				}
			})}
		>
			{text('children', 'Hello, {{planet}}!')}
		</Span>
	))
