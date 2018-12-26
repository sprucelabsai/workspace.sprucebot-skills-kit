// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import FontLoader from './FontLoader'

const stories = storiesOf('FontLoader', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
	<div>
		<FontLoader
			fonts={[
				{
					name: 'Source Sans Pro',
					weight: 400,
					link: {
						href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
						rel: 'stylesheet'
					}
				},
				{
					name: 'Source Sans Pro',
					weight: 600,
					link: {
						href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:600',
						rel: 'stylesheet'
					}
				},
				{
					name: 'Source Code Pro',
					weight: 500,
					link: {
						href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:500',
						rel: 'stylesheet'
					}
				}
			]}
		/>
		<h1>Hello, are you a UFO?</h1>
	</div>
))
