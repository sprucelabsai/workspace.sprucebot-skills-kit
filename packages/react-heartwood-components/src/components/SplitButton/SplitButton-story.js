import React from 'react'
import { storiesOf } from '@storybook/react'

import SplitButton from './SplitButton'

storiesOf('SplitButton', module).add('Split Button', () => (
	<SplitButton defaultAction="Hello" />
))
