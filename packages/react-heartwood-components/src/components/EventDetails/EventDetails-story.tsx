import React from 'react'
import { storiesOf } from '@storybook/react'

import EventDetails from './EventDetails'

const stories = storiesOf('EventDetails', module)

stories.add('Hello World', () => <EventDetails items={[]} />)
