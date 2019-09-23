import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs'
import Text, { Span } from './Text'
const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

stories
	.add('Text', () => (
		<Text
			isInline={boolean('Is Inline', false)}
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
			isInline={boolean('is inline', true)}
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
