import React from 'react'
import { storiesOf } from '@storybook/react'

import SplitButton from './SplitButton'

storiesOf('SplitButton', module)
	.add('Primary', () => (
		<SplitButton
			defaultAction={{ text: 'Do the default action' }}
			actions={[{ text: 'Thing two' }]}
			kind="primary"
		/>
	))
	.add('Secondary', () => (
		<SplitButton
			defaultAction={{ text: 'Do the default action' }}
			actions={[{ text: 'Thing two' }]}
			kind="primary"
		/>
	))
