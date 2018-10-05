// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Card, { CardHeader } from './Card'

const stories = storiesOf('Card', module)

stories.addDecorator(withKnobs)

stories.add('Card', () => (
	<Container>
		<Card>
			<CardHeader title="Hello" />
			<p>Hello</p>
		</Card>
	</Container>
))
