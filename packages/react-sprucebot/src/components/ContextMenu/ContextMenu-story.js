import React from 'react'
import { storiesOf } from '@storybook/react'
import ContextMenu from './ContextMenu'

storiesOf('Context Menu', module).add('Example', () => (
	<ContextMenu actions={[{ text: 'one' }]} leftAlign />
))
