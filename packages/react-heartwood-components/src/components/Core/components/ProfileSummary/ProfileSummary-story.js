// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import ProfileSummary from './ProfileSummary'
import defaultImageLg from '../../../../../static/assets/users/user-placeholder--96w.png'

const stories = storiesOf('Profile Summary', module)

stories.addDecorator(withKnobs)

stories.add('Basic', () => (
	<ProfileSummary
		image={text('image', defaultImageLg)}
		name={text('name', 'Dorian Feeney')}
	/>
))
