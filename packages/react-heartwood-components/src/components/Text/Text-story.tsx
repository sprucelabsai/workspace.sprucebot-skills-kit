import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, object } from '@storybook/addon-knobs/react'
import Text, { Span, ITextProps } from './Text'
const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

const options: ITextProps['element'][] = [
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
	.add('Text - Specific Examples', () => (
		<Fragment>
			<Text element={'a'} href={'http://www.google.com'}>
				Google
			</Text>
		</Fragment>
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
