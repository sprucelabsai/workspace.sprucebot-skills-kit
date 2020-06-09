// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Avatar from './Avatar'

const stories = storiesOf('Avatar', module)

stories.addDecorator(withKnobs({ escapeHtml: false }))

stories.add('Avatar', () => (
	<Avatar
		image={text(
			'image',
			boolean('isLarge', false)
				? '/assets/users/user-placeholder.png'
				: '/assets/users/user-placeholder--96w.png'
		)}
		alt={text('alt', 'Name')}
		isLarge={boolean('isLarge', false)}
		isVertical={boolean('isVertical', false)}
		showIndicator={boolean('showIndicator', false)}
		status={text('status', 'online')}
		name={text('name', '')}
		text={text('text', '')}
		width={number('width', null)}
		height={number('height', null)}
	/>
))
