// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import faker from 'faker'

import Layout, { LayoutSection } from './index'
import Card, { CardHeader, CardBody } from '../Card'
const stories = storiesOf('Layout', module)

stories.addDecorator(withKnobs)

const generateCard = () => (
	<Card>
		<CardHeader title={faker.lorem.words(3)} />
		<CardBody>{faker.lorem.words(Math.floor(Math.random() * 25 + 5))}</CardBody>
	</Card>
)

stories
	.add('Primary Layout', () => (
		<Layout>
			<LayoutSection>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Two Column Layout', () => (
		<Layout>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Two Column Primary & Secondary Layout', () => (
		<Layout>
			<LayoutSection>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Tight Layout', () => (
		<Layout width="tight">
			<LayoutSection>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Wide Layout', () => (
		<Layout width="wide">
			<LayoutSection>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Full-Width Layout', () => (
		<Layout width="full-width">
			<LayoutSection>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Full-Bleed Layout', () => (
		<Layout width="full-width" isFullBleed>
			<LayoutSection>{generateCard()}</LayoutSection>
		</Layout>
	))
	.add('Very dense full-width layout', () => (
		<Layout width="full-width">
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
			<LayoutSection isSecondary>{generateCard()}</LayoutSection>
		</Layout>
	))
