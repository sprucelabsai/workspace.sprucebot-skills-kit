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
				fields: [
					{
						element: 'textInput',
						label: 'Base Price',
						placeholder: '$20'
					}
				]
			}
		]}
	/>
))
