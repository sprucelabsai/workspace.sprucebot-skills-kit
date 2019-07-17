import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs/react'
import Wrapper from './Wrapper'

const stories = storiesOf('Wrapper', module)

stories.addDecorator(withKnobs)

stories.add('Wrapper', () => (
	<Wrapper
		padding={select(
			'padding',
			['extra-tight', 'tight', 'base', 'loose', 'extra-loose', 'none', null],
			'base'
		)}
		top={select(
			'top',
			['extra-tight', 'tight', 'base', 'loose', 'extra-loose', 'none', null],
			null
		)}
		right={select(
			'right',
			['extra-tight', 'tight', 'base', 'loose', 'extra-loose', 'none', null],
			null
		)}
		bottom={select(
			'bottom',
			['extra-tight', 'tight', 'base', 'loose', 'extra-loose', 'none', null],
			null
		)}
		left={select(
			'left',
			['extra-tight', 'tight', 'base', 'loose', 'extra-loose', 'none', null],
			null
		)}
		debug={boolean('debug', true)}
	>
		<p>Hello earl</p>
	</Wrapper>
))
