import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Icon from './Icon'
import readme from './Icon.md'

const stories = storiesOf('Icon', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, withInfo()(() => <Icon>edit</Icon>))
)
