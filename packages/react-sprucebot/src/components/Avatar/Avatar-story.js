// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Avatar from './Avatar'

import defaultImage from '../../../static/assets/users/user-placeholder.png'
import defaultImageLg from '../../../static/assets/users/user-placeholder--96w.png'
import userImage from '../../../static/assets/users/user-01.png'
import userImageLg from '../../../static/assets/users/user-01--96w.png'

const stories = storiesOf('Avatar', module)

stories.addDecorator(withKnobs)

stories.add('Avatar', () => (
	<Container size="small">
		<Avatar
			image={
				boolean('Large', false)
					? boolean('Default Image', false)
						? defaultImageLg
						: userImageLg
					: boolean('Default Image', false)
						? defaultImage
						: userImage
			}
			alt="Default User Image"
			name={text('Name', '')}
			text={text('Text', '')}
			isLarge={boolean('Large', false)}
			isVertical={boolean('Vertical', false)}
			showIndicator={boolean('Show Indicator', false)}
			status={boolean('Online', false) ? 'online' : 'offline'}
			width={number('Width', null)}
			height={number('Height', null)}
		/>
	</Container>
))
