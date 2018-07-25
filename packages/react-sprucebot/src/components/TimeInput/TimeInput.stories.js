import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import TimeInput from './TimeInput'
import readme from './TimeInput.md'

const stories = storiesOf('TimeInput', module)
stories.addDecorator(withKnobs)

stories.add('Placeholder', withReadme(readme, () => <p>Placeholder</p>))
