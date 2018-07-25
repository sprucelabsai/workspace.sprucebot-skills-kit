import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import DevControls from './DevControls'
import readme from './DevControls.md'

const stories = storiesOf('DevControls', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, withInfo()(() => <DevControls />))
)
