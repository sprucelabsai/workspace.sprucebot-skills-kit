// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import Layout, { LayoutSection } from './index'
import Card, { CardHeader, CardBody, CardSection } from '../Card'
const stories = storiesOf('Layout', module)

stories.addDecorator(withKnobs)

const card = (
	<Card>
		<CardHeader title="Get the most out of Spruce" />
		<CardBody>
			Two roads diverged in a wood, and I took the one less traveled by, And
			that has made all the difference.
		</CardBody>
	</Card>
)

stories
	.add('Primary Layout', () => (
		<Layout>
			<LayoutSection>{card}</LayoutSection>
		</Layout>
	))
	.add('Two Column Layout', () => (
		<Layout>
			<LayoutSection isSecondary>{card}</LayoutSection>
			<LayoutSection isSecondary>{card}</LayoutSection>
		</Layout>
	))
	.add('Two Column Primary & Secondary Layout', () => (
		<Layout>
			<LayoutSection>{card}</LayoutSection>
			<LayoutSection isSecondary>{card}</LayoutSection>
		</Layout>
	))
	.add('Wide Layout', () => (
		<Layout width="wide">
			<LayoutSection>{card}</LayoutSection>
		</Layout>
	))
	.add('Full-Width Layout', () => (
		<Layout width="full-width">
			<LayoutSection>{card}</LayoutSection>
		</Layout>
	))
	.add('Full-Bleed Layout', () => (
		<Layout width="full-width" isFullBleed>
			<LayoutSection>{card}</LayoutSection>
		</Layout>
	))
