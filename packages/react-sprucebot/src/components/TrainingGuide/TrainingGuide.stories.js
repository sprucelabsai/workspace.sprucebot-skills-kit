import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import TrainingGuide from './TrainingGuide'
import readme from './TrainingGuide.md'

const stories = storiesOf('TrainingGuide', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<TrainingGuide
			steps={['one']}
			nextButtonLabel="Next"
			doneButtonLabel="done"
			onComplete={() => null}
			onboardingComplete={false}
		/>
	))
)
