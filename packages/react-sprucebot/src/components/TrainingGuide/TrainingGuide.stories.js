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
			steps={['Step 1', 'Step 2', 'Step 3']}
			nextButtonLabel="Next"
			doneButtonLabel="Done"
			onComplete={() => null}
			onboardingComplete={false}
		/>
	))
)
