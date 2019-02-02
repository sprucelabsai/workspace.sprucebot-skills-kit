// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import RecordTable from './RecordTable'

const stories = storiesOf('RecordTable', module)

stories.addDecorator(withKnobs)

stories.add('RecordTable', () => <div>TODO</div>)
