// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import BigCalendar from './BigCalendar'

const stories = storiesOf('Big Calendar', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
	<Container>
		<BigCalendar />
	</Container>
))
