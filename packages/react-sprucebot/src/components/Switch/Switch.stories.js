import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Switch from './Switch'
import readme from './Switch.md'

const stories = storiesOf('Switch', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => <Switch on={boolean('On', false)} />)
)
