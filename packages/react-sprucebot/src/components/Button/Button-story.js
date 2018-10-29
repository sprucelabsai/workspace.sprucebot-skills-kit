// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object
} from '@storybook/addon-knobs/react'
import Wrapper from '../../../.storybook/Wrapper'
import Button from './Button'
import Icon from '../Icon/Icon'
import Icon11 from '../../../static/assets/icons/Phones-Mobile-Devices/Phone/phone-retro-1.svg'

type GroupProps = {
	kind: string
}

const btnText = text('text', 'Hello World')
const isSmall = boolean('isSmall', false)
const isFullWidth = boolean('isFullWidth', false)
const icon = text('icon', 'edit')

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
			className={text('className', 'l-mr-small l-mb-small')}
			isSmall={isSmall}
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'primary'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			icon={
				icon ? (
					<Icon
						icon={text('icon', '')}
						className={text('iconClassName', 'btn__line-icon')}
					/>
				) : null
			}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Secondary', () => (
		<Button
			className={text('className', 'l-mr-small l-mb-small')}
			isSmall={isSmall}
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'secondary'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			icon={
				icon ? (
					<Icon
						icon={text('icon', '')}
						className={text('iconClassName', 'btn__line-icon')}
					/>
				) : null
			}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Simple', () => (
		<Button
			className={text('className', 'l-mr-small l-mb-small')}
			isSmall={isSmall}
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'simple'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			icon={
				icon ? (
					<Icon
						icon={text('icon', '')}
						className={text('iconClassName', 'btn__line-icon')}
					/>
				) : null
			}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
	.add('Caution', () => (
		<Button
			className={text('className', 'l-mr-small l-mb-small')}
			isSmall={isSmall}
			isFullWidth={isFullWidth}
			text={btnText}
			kind={text('kind', '') || 'caution'}
			disabled={boolean('disabled', false)}
			isLoading={boolean('isLoading', false)}
			icon={
				icon ? (
					<Icon
						icon={text('icon', '')}
						className={text('iconClassName', 'btn__line-icon')}
					/>
				) : null
			}
			href={text('href', '')}
			target={text('target', '')}
			onClick={text('onClick', '() => console.log("you clicked")')}
			linkProps={object('linkProps', {})}
		/>
	))
