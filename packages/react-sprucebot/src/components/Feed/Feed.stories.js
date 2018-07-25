import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Feed from './Feed'
import readme from './Feed.md'

const stories = storiesOf('Feed', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, withInfo()(() => <Feed />)))
