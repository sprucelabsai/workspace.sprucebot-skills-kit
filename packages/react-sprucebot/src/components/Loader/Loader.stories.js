import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Loader from './Loader'
import readme from './Loader.md'

const stories = storiesOf('Loader', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, () => <Loader />))
