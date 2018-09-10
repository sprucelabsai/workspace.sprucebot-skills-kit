import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Avatar from './Avatar'
import readme from './Avatar.md'

const mockAuth = {
	role: 'owner',
	user: {
		User: {
			id: '123'
		},
		Location: {
			id: '123'
		}
	}
}

const imageOptions = {
	'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg': 'Default',
	'https://hello.sprucebot.com/avatar.jpg': 'User Image'
}

const defaultImage = 'https://hello.sprucebot.com/avatar.jpg'

const stories = storiesOf('Avatar', module)
stories.addDecorator(withKnobs)

stories
	.add(
		'Default',
		withReadme(
			readme,
			withInfo()(() => (
				<Avatar
					top={false}
					online={boolean('Online', false)}
					image={select('Image', imageOptions, defaultImage)}
				/>
			))
		)
	)
	.add(
		'Large',
		withReadme(
			readme,
			withInfo()(() => (
				<Avatar
					top
					online={boolean('Online', false)}
					image={select('Image', imageOptions, defaultImage)}
				/>
			))
		)
	)
	.add(
		'Editable',
		withReadme(
			readme,
			withInfo()(() => (
				<Avatar
					top
					online={boolean('Online', false)}
					enableProfileEditing
					auth={mockAuth}
					user={mockAuth.user}
					image={select('Image', imageOptions, defaultImage)}
				/>
			))
		)
	)
