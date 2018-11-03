// @flow
import React from 'react'
import cx from 'classnames'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import Icon from './Icon'

const options = {
	Add: 'add',
	Close: 'close',
	Date: 'date',
	Delete: 'delete',
	Edit: 'edit'
}

const stories = storiesOf('Icon', module)

stories.addDecorator(withKnobs)

stories.add('Icon', () => (
	<Icon
		icon={select('icon', options, 'edit')}
		isLineIcon={boolean('isLineIcon', true)}
	/>
))
