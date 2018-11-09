// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { H1, H2, H3, H4, Text, Span, Anchor } from './Text'
import Container from '../Layout/Container/Container'

const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

stories.add('Default', () => (
	<Container>
		<H1 className="l-mb-small">
			{text('H1', 'Expanding Your Home Network’s Reach')}
		</H1>
		<H2 className="l-mb-small">
			{text('H2', 'How to Prepare for an Automated Future')}
		</H2>
		<H3 className="l-mb-small">
			{text(
				'H3',
				'Cloud Produces Sunny Earnings at Amazon, Microsoft and Alphabet'
			)}
		</H3>
		<H4 className="l-mb-small">
			{text('H4', 'Daily Report: More Self-Driving Cars Take to the Streets')}
		</H4>
		<Text className="l-mb-small">
			{text(
				'Text',
				'With so much talk about how the Internet will spell the end of brick-and-mortar, nobody has stopped to ask, "What can the Internet do to save brick-and-mortar?"'
			)}
		</Text>
		<Span>
			{text(
				'Span',
				"Amazon is not your competition. It is a place to get things cheap. Which is cool, because you're not a cheap business."
			)}
		</Span>
		<Text className="l-mb-small">
			{text('Text', 'Expanding Your Home Network’s Reach')}
			<Span>
				{text(
					'Span',
					"Amazon is not your competition. It is a place to get things cheap. Which is cool, because you're not a cheap business. "
				)}
			</Span>
			<Anchor href="#" target="_blank">
				{text('Anchor', 'This is a link')}
			</Anchor>
		</Text>
	</Container>
))
