// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import FeedBuilder from './FeedBuilder'

const stories = storiesOf('Feed Builder', module)

stories.add('Basic', () => <FeedBuilder />)
