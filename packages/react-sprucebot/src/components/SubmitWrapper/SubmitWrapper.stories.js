import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import SubmitWrapper from './SubmitWrapper'
import Button from '../Button/Button'
import readme from './SubmitWrapper.md'

const stories = storiesOf('SubmitWrapper', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<SubmitWrapper>
			<Button primary>Button 1</Button>
			<Button alt>Button 2</Button>
			<Button alt>Button 3</Button>
		</SubmitWrapper>
	))
)
