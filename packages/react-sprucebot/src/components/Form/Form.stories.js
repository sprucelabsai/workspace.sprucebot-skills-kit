import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Form from './Form'
import readme from './Form.md'

const stories = storiesOf('Form', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, withInfo()(() => <Form />)))
