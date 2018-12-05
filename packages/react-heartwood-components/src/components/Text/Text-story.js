// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import Text from './Text'
const stories = storiesOf('Text', module)

stories.addDecorator(withKnobs)

stories.add('Text', () => <Text>{text('children', 'Hello, world')}</Text>)
