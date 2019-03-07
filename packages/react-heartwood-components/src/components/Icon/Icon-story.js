// @flow
import React from 'react'
import { each, keys, map } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import Icon from './Icon'

import * as icons from '../../icons.js'

import './demo.scss'

const options = {}

each(keys(icons), icon => {
	options[icon] = icon
})

const stories = storiesOf('Icon', module)

stories.addDecorator(withKnobs)

stories
	.add('Icon', () => <Icon icon={select('icon', options, 'edit')} />)
	.add('Line Icon', () => <Icon icon={'edit'} />)
	.add('Solid Icon', () => <Icon icon={'cancel_solid'} />)

stories.add('All Icons', () => (
	<div className="Storybook-IconGrid">
		{map(keys(icons), icon => (
			<div className="Storybook-IconGridItem" key={`icon-${icon}`}>
				<Icon icon={icon} />
				<div>{icon}</div>
			</div>
		))}
	</div>
))
