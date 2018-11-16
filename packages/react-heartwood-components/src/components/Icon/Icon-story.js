// @flow
import React from 'react'
import { each, keys } from 'lodash'
import cx from 'classnames'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import Icon from './Icon'

import * as icons from '../../icons.js'

const options = {}

each(keys(icons), icon => {
	options[icon] = icon
})

const stories = storiesOf('Icon', module)

stories.addDecorator(withKnobs)

stories.add('Icon', () => (
	<Icon
		icon={select('icon', options, 'edit')}
		isLineIcon={boolean('isLineIcon', true)}
	/>
))
