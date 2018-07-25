import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Dialog from './Dialog'
import readme from './Dialog.md'

const stories = storiesOf('Dialog', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, withInfo()(() => <Dialog />)))
