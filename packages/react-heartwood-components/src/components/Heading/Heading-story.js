// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import Heading from './Heading'
const stories = storiesOf('Heading', module)

stories.addDecorator(withKnobs)

stories.add('Heading', () => (
	<Heading>{text('children', 'Hello, world')}</Heading>
))
