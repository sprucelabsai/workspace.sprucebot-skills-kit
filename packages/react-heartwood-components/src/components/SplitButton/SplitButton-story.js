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
	.add('Primary Small', () => (
		<SplitButton
			defaultAction={{ text: 'Do the default action' }}
			actions={[{ text: 'Thing two' }]}
			kind="primary"
			isSmall
		/>
	))
	.add('Secondary', () => (
		<SplitButton
			defaultAction={{ text: 'Do the default action' }}
			actions={[{ text: 'Thing two' }]}
			kind="secondary"
		/>
	))
	.add('Secondary Small', () => (
		<SplitButton
			defaultAction={{ text: 'Do the default action' }}
			actions={[{ text: 'Thing two' }]}
			kind="secondary"
			isSmall
		/>
	))
