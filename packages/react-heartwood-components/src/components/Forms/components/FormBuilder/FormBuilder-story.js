// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	object,
	number,
	select
} from '@storybook/addon-knobs/react'
import FormBuilder from './FormBuilder'

const stories = storiesOf('FormBuilder', module)

stories.addDecorator(withKnobs)

stories.add('Basic', () => (
	<FormBuilder
		rows={[
			{
				id: 'settings',
				fields: [
					{
						id: 'settingsList',
						element: 'list',
						items: [
							{
								title: 'Guest SMS cancellations',
								subtitle: 'Guests can cancel an appointment via SMS',
								toggleId: 'smsCancellations'
							},
							{
								title: 'Guest SMS confirmations',
								subtitle: 'Guests can confirm an appointment via SMS',
								toggleId: 'smsConfirmations'
							}
						]
					}
				]
			},
			{
				id: 'basePriceRow',
				fields: [
					{
						id: 'basePrice',
						element: 'textInput',
						label: 'Base Price',
						placeholder: '$20'
					}
				]
			}
		]}
	/>
))
