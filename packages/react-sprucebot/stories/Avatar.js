import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import {
	withKnobs,
	text,
	boolean,
	number,
	select
} from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Avatar from '../lib/components/Avatar/Avatar'
import readme from './docs/Avatar.md'

const stories = storiesOf('Avatar', module)
stories.addDecorator(withKnobs)

const imageOptions = {
	'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg': 'Default',
	'https://hello.sprucebot.com/avatar.jpg': 'User Image'
}

const defaultImage =
	'https://hello.sprucebot.com/avatar.jpg'

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<Avatar
					top={boolean('Top', true)}
					online={boolean('Onine', false)}
					image={select('Image', imageOptions, defaultImage)}
				/>
			</div>
		))
	)
)
