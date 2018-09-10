import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Stars from './Stars'
import readme from './Stars.md'

const stories = storiesOf('Stars', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, () => <Stars />))
