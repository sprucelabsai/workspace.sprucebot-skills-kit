import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, withKnobs } from '@storybook/addon-knobs/react'
import faker from 'faker'

import Layout, { LayoutSection } from './index'
import Card from '../Card/Card'
const stories = storiesOf('Layout', module)

stories.addDecorator(withKnobs)

const generateCard = () => (
	<Card>
		<Card.Header title={faker.lorem.words(3)} />
		<Card.Body>
			{faker.lorem.words(Math.floor(Math.random() * 25 + 5))}
		</Card.Body>
	</Card>
)

stories
	.add('Spacing Utilities', () => {
		const prefixSelect = select(
			'side',
			['all', 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left'],
			'all'
		)
		const prefixes = {
			all: '',
			horizontal: 'x',
			vertical: 'y',
			top: 't',
			right: 'r',
			bottom: 'b',
			left: 'l'
		}
		return (
			<div style={{ backgroundColor: 'rgba(49,95,204,0.5)' }}>
				<div
					className={`p${prefixes[prefixSelect]}-${select(
						'spacing',
						[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
						1
					)}`}
					style={{ width: 'auto', backgroundColor: 'rgba(49,95,204,0.5)' }}
				>
					<p style={{ backgroundColor: '#fff' }}>This is content</p>
				</div>
			</div>
		)
	})
	.add('Container Classes', () => (
		<div className="p-4" style={{ backgroundColor: 'rgba(49,95,204,0.5)' }}>
			<div
				className={`container--${select(
					'container class',
					['base', 'tight', 'wide'],
					'base'
				)}`}
				style={{ backgroundColor: '#fff' }}
			>
				<p>This is the content</p>
			</div>
		</div>
	))
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
