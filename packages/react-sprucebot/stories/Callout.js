import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react'
import { withReadme, withDocs } from 'storybook-readme'
import Callout from '../lib/components/Callout/Callout'
import BotText from '../lib/components/BotText/BotText'
import readme from './docs/Callout.md'

const stories = storiesOf('Callout', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(
		readme,
		withInfo()(() => (
			<div className="single_col">
				<BotText>
					If you have some information you need to call out (think modal
					dialog), you can use the {`<Callout />`} component.
				</BotText>
				<Callout on={boolean('Toggle callout', false)}>
					<BotText>
						Things like nested forms or multi-step processes benefit greatly
						from a callout. It lets you see where you were, but brings focus to
						what you're about to do.
					</BotText>
				</Callout>
			</div>
		))
	)
)
