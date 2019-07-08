// @flow
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object,
	select
} from '@storybook/addon-knobs/react'
import {
	userList,
	userList02,
	userList03
} from '../../../.storybook/data/people'
import TruncatedList from './TruncatedList'

const stories = storiesOf('TruncatedList', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(withKnobs)

stories.add('Truncated List', () => <TruncatedList />)
