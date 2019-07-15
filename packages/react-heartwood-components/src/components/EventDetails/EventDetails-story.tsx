import React from 'react'
import { storiesOf } from '@storybook/react'

import { Sidebar } from '../Core'
import EventDetails from './EventDetails'

const stories = storiesOf('EventDetails', module)

stories.add('Hello World', () => (
	<Sidebar side="right" isCollapsible={false} isLarge>
		<EventDetails
			items={[
				{ id: '1', component: 'button', componentProps: { text: 'Test' } }
			]}
		/>
	</Sidebar>
))
