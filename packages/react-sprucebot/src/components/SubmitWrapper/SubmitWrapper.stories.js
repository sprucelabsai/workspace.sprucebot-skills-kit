import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import SubmitWrapper from './SubmitWrapper'
import readme from './SubmitWrapper.md'

const stories = storiesOf('SubmitWrapper', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, () => <SubmitWrapper />))
