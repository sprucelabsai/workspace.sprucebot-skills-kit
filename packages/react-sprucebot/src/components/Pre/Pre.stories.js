import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Pre from './Pre'
import readme from './Pre.md'

const stories = storiesOf('Pre', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, () => <Pre />))
