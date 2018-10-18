// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonGroup from './ButtonGroup'

storiesOf('ButtonGroup', module)
	.add('Default', () => (
		<ButtonGroup
			actions={[
				{ text: 'Confirm Changes', kind: 'primary' },
				{ text: 'Cancel', kind: 'secondary' }
			]}
		/>
	))
	.add('Segmented', () => (
		<ButtonGroup
			kind="segmented"
			actions={[
				{
					text: 'Option One'
				},
				{
					text: 'Option Two'
				},
				{
					text: 'Option Three'
				}
			]}
		/>
	))
	.add('Floating', () => (
		<ButtonGroup
			kind="floating"
			actions={[
				{
					text: 'Edit Service'
				},
				{
					text: 'Hide Service'
				},
				{
					text: 'Move to Category'
				}
			]}
		/>
	))
