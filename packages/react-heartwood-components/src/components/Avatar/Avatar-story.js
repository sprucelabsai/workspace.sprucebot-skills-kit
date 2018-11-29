// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	number
} from '@storybook/addon-knobs/react'
import Avatar from './Avatar'

import defaultImage from '../../../static/assets/users/user-placeholder.png'
import defaultImageLg from '../../../static/assets/users/user-placeholder--96w.png'

const stories = storiesOf('Avatar', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)
stories.addDecorator(withKnobs)

stories.add('Avatar', () => (
	<Avatar
		image={
			boolean('isLarge', false)
				? text('image', '') || defaultImageLg
				: text('image', '') || defaultImage
		}
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
