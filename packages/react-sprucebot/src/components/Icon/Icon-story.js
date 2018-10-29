// @flow
import React from 'react'
import cx from 'classnames'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import Icon from './Icon'

const stories = storiesOf('Icon', module)

stories.addDecorator(withKnobs)

stories.add('Icon', () => (
	<Icon
		icon={text('icon', 'edit')}
		className={cx(text('className', ''), {
			'u-icon__no-fill u-icon__stroke': boolean('isLineIcon', true)
		})}
	/>
))
