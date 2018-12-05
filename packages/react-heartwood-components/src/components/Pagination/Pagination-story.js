// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Pagination from './Pagination'

const stories = storiesOf('Pagination', module)

stories.addDecorator(withKnobs)

stories.add('Pagination', () => (
	<Pagination
		currentPage={number('currentPage', 0)}
		totalPages={number('totalPages', 100)}
		showPages={boolean('showPages', false)}
		showJump={boolean('showJump', false)}
		onClickNext={() => console.log('You clicked next')}
		onClickBack={() => console.log('You clicked back')}
		onPageButtonClick={page => console.log('You clicked ', page)}
		onJump={value => console.log('Use jump: ', value)}
	/>
))
