import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Onboarding from './Onboarding'
import readme from './Onboarding.md'

const stories = storiesOf('Onboarding', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<Onboarding
			heading="Onboarding"
			steps={[]}
			onComplete={() => null}
			doneButtonLabel="End"
		/>
	))
)
