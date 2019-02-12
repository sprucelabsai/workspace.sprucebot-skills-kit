// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object
} from '@storybook/addon-knobs/react'
import Button from './Button'

const btnText = text('text', 'Hello World')
const isFullWidth = boolean('isFullWidth', false)

const stories = storiesOf('Button', module)
stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)
stories.addDecorator(withKnobs)

stories
	.add('Primary', () => (
		<Button
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'primary'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			isSmall={boolean('isSmall', false)}
			isIconOnly={boolean('isIconOnly', false)}
			icon={{
				icon: text('icon', null),
				className: text('iconClassName', 'btn__line-icon')
			}}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Secondary', () => (
		<Button
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'secondary'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			isSmall={boolean('isSmall', false)}
			icon={{
				icon: text('icon', null),
				className: text('iconClassName', 'btn__line-icon')
			}}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Simple', () => (
		<Button
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'simple'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			isSmall={boolean('isSmall', false)}
			icon={{
				icon: text('icon', null),
				className: text('iconClassName', 'btn__line-icon')
			}}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Caution', () => (
		<Button
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'caution'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			isSmall={boolean('isSmall', false)}
			icon={{
				icon: text('icon', null),
				className: text('iconClassName', 'btn__line-icon')
			}}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
