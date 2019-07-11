// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import { manyTabs } from '../../../.storybook/data/tabs'
import Tabs from './Tabs'

const stories = storiesOf('Tabs', module)

stories.addDecorator(withKnobs)

stories
	.add('Tabs', () => (
		<Tabs
			tabs={object('tabs', [
				{ text: 'Team', isCurrent: true },
				{ text: 'Guests' },
				{ text: 'Everyone', onClick: () => console.log('Click') }
			])}
		/>
	))
	.add('Many Tabs', () => <Tabs tabs={object('tabs', manyTabs)} />)
