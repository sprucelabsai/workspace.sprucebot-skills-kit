// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import BigSearch from '../BigSearch/BigSearch'

const stories = storiesOf('Big Search', module)

stories.addDecorator(withKnobs)
stories.add('Big Search', () => {
	return <BigSearch />
})
