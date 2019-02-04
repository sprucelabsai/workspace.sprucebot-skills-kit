// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'

const stories = storiesOf('RecordTable', module)

stories.addDecorator(withKnobs)

stories.add('RecordTable', () => <div>TODO</div>)
