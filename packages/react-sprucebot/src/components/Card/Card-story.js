// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Card, { CardHeader, CardBody, CardFooter } from './Card'
import Button from '../Button/Button'

const stories = storiesOf('Card', module)

stories.addDecorator(withKnobs)

stories.add('Card', () => (
	<Container size="medium">
		<Card>
			<CardHeader title="Get the most out of Spruce" />
			<CardBody>
				<p>
					Two roads diverged in a wood, and I took the one less traveled by, And
					that has made all the difference.
				</p>
			</CardBody>
			<CardFooter>
				<Button kind="secondary" text="Get some skills" />
			</CardFooter>
		</Card>
	</Container>
))
