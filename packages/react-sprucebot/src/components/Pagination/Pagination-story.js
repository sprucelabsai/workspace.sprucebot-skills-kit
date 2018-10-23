// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Pagination from './Pagination'

const stories = storiesOf('Pagination', module)

stories.addDecorator(withKnobs)

stories.add('Pagination', () => (
	<Pagination
		currentPage={number('Current Page', 1)}
		totalPages={number('Total Pages', 100)}
		showPages={boolean('Show Pages', false)}
		showJump={boolean('Show Jump', false)}
	/>
))
