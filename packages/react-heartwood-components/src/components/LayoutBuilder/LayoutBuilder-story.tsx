import {
	IHWButtonKinds,
	IHWButtonTypes,
	IHWCardBuilder,
	IHWCardBuilderBodyItemType,
	IHWLayoutBuilderSectionType,
	IHWLayoutWidth,
	IHWSidebarSide
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

stories.add('Render a Page', () => (
	<LayoutBuilder
		items={[
			{
				type: IHWLayoutBuilderSectionType.Page,
				viewModel: {
					header: {
						title: 'My Cool Page',
						backLinkText: 'Go back somewhere',
						backLinkHref: '#',
						primaryAction: {
							id: 'do-something',
							href: '#',
							text: 'Do something',
							kind: IHWButtonKinds.Primary
						}
					},
					contentLayoutBuilder: {
						items: [
							{
								type: IHWLayoutBuilderSectionType.Layout,
								viewModel: {
									width: IHWLayoutWidth.FullWidth,
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
						]
					}
				}
			}
		]}
	/>
))

stories.add('Render a Page with a Sidebar', () => (
	<LayoutBuilder
		items={[
			{
				type: IHWLayoutBuilderSectionType.Page,
				viewModel: {
					header: {
						title: 'My Cool Page',
						backLinkText: 'Go back somewhere',
						backLinkHref: '#',
						primaryAction: {
							id: 'do-something',
							href: '#',
							text: 'Do something',
							kind: IHWButtonKinds.Primary
						}
					},
					contentLayoutBuilder: {
						items: [
							{
								type: IHWLayoutBuilderSectionType.Layout,
								viewModel: {
									width: IHWLayoutWidth.FullWidth,
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
						]
					},
					sidebarLayoutBuilder: {
						items: [
							{
								type: IHWLayoutBuilderSectionType.Sidebar,
								viewModel: {
									side: IHWSidebarSide.Right,
									isLarge: true,
									isCollapsible: false,
									sections: [
										{
											layoutBuilder: {
												items: [
													{
														type: IHWLayoutBuilderSectionType.SidebarHeader,
														viewModel: {
															action: {
																id: 'go',
																text: 'Burn it down!',
																kind: IHWButtonKinds.Caution
															},
															title: 'My Sidebar'
														}
													},
													{
														type: IHWLayoutBuilderSectionType.CardBuilder,
														viewModel: cardJSON
													},
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
						]
					}
				}
			}
		]}
	/>
))
