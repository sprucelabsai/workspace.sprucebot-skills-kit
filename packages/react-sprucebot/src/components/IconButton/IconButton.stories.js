import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import IconButton from './IconButton'
import readme from './IconButton.md'

const stories = storiesOf('IconButton', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, withInfo()(() => <IconButton />)))
