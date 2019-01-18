// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object
} from '@storybook/addon-knobs/react'
import Message, { MessageBuilder } from './index'
import Page, { PageContent } from '../Page'
import Layout, { LayoutSection } from '../Layout'
import Text from '../Text/Text'

const messageJSON = {
	body: {
		text: `{{name}} let's you {{boldString}}. duh. kthxbai!`,
		context: {
			name: {
				type: 'text',
				props: { element: 'a', children: 'MessageBuilder' }
			},
			boldString: {
				type: 'textStyle',
				props: { type: 'strong', children: 'build messages' }
			}
		}
	}
}

const stories = storiesOf('Message', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(story => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>{story()}</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
))

stories.addDecorator(withKnobs)

stories
	.add('Message', () => <Message>It's lonely over here.</Message>)
	.add('MessageBuilder', () => [
		<MessageBuilder {...object('json', messageJSON)} />
	])
