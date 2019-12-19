import {
	IHWButtonKinds,
	IHWButtonTypes,
	IHWCardBuilder,
	IHWCardBuilderBodyItemType,
	IHWLayoutBuilderSectionType
} from '@sprucelabs/spruce-types'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ButtonKinds } from '../Button/Button'
import { LayoutBuilder } from './LayoutBuilder'

const stories = storiesOf('LayoutBuilder', module)

const cardJSON: IHWCardBuilder = {
	id: 'foo',
	header: {
		title: 'This is a basic card',
		labelText: ''
	},
	body: {
		items: [
			{
				type: IHWCardBuilderBodyItemType.Text,
				viewModel: {
					id: 'first',
					text: `This was built by the CardBuilder (via the PageBuilder)!`
				}
			}
		]
	},
	footer: {
		buttonGroup: {
			actions: [
				{
					id: 'foo',
					type: IHWButtonTypes.Button,
					text: 'Fire a JS Callback!',
					htmlAttributes: {
						onClick: () => window.alert('clicked!')
					},
					kind: ButtonKinds.Secondary,
					isSmall: true
				}
			]
		}
	}
}

const buttonModel = {
	type: IHWLayoutBuilderSectionType.Button,
	viewModel: {
		id: 'new-button',
		text: 'My cool button',
		kind: IHWButtonKinds.Primary
	}
}

stories.addDecorator(withKnobs)

stories.add('Simply rendering a cardbuilder', () => (
	<LayoutBuilder
		items={[
			{
				type: IHWLayoutBuilderSectionType.Layout,
				viewModel: {
					sections: [
						{
							layoutBuilder: {
								items: [
									{
										type: IHWLayoutBuilderSectionType.CardBuilder,
										viewModel: cardJSON
									}
								]
							}
						}
					]
				}
			}
		]}
	/>
))

stories.add('Three-up cards, with a button underneath', () => (
	<LayoutBuilder
		items={[
			{
				type: IHWLayoutBuilderSectionType.Layout,
				viewModel: {
					sections: [
						{
							isSecondary: true,
							layoutBuilder: {
								items: [
									{
										type: IHWLayoutBuilderSectionType.CardBuilder,
										viewModel: cardJSON
									}
								]
							}
						},
						{
							isSecondary: true,
							layoutBuilder: {
								items: [
									{
										type: IHWLayoutBuilderSectionType.CardBuilder,
										viewModel: cardJSON
									}
								]
							}
						},
						{
							isSecondary: true,
							layoutBuilder: {
								items: [
									{
										type: IHWLayoutBuilderSectionType.CardBuilder,
										viewModel: cardJSON
									}
								]
							}
						},
						{
							layoutBuilder: {
								items: [buttonModel]
							}
						}
					]
				}
			}
		]}
	/>
))
