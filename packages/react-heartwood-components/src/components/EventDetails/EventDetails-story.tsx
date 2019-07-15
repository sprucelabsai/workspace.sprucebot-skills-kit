import React from 'react'
import { storiesOf } from '@storybook/react'

import { Sidebar } from '../Core'
import EventDetails from './EventDetails'
import Text from '../Text/Text'
import TextStyle from '../TextStyle/TextStyle'

const stories = storiesOf('EventDetails', module)

stories.add('Hello World', () => (
	<Sidebar side="right" isCollapsible={false} isLarge>
		<EventDetails
			items={[
				{
					id: 'guestInfo',
					component: 'list',
					componentProps: {
						items: [
							{
								avatar:
									'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=96&h=96&q=80',
								title: 'Alejandra Pollich',
								subtitle: '(605) 230-5253',
								contextMenu: {
									icon: { name: 'edit', isLineIcon: true },
									isSimple: true,
									isSmall: true,
									size: 'large',
									actions: [
										{
											text: 'Edit guest'
										},
										{
											text: 'Book for someone else'
										}
									]
								}
							},
							{
								icon: { name: 'note', isLineIcon: true },
								title: 'Prefers products that aren’t tested on animals.',
								subtitle: 'Caleigh Jerde, 4 months ago'
							}
						],
						primaryAction: 'test'
					}
				},
				{
					id: 'dateAndTime',
					component: 'list',
					componentProps: {
						items: [
							{
								icon: { name: 'calendar', isLineIcon: true },
								title: 'Web, Nov 28, 2018',
								subtitle: '11am–12:15pm',
								actions: [
									{
										icon: { name: 'edit' },
										kind: 'simple'
									}
								]
							}
						]
					}
				},
				{
					id: 'services',
					component: 'list',
					componentProps: {
						items: [
							{
								icon: { name: 'unordered_list', isLineIcon: true },
								title: 'Accent Highlight',
								subtitle: '$65 | 1hr',
								note: 'Vicenta Maggio',
								contextMenu: {
									icon: { name: 'edit', isLineIcon: true },
									isSimple: true,
									isSmall: true,
									size: 'large',
									actions: [
										{
											text: 'Change teammate'
										},
										{
											text: 'Remove from appointment'
										}
									]
								}
							},
							{
								icon: { name: 'unordered_list', isLineIcon: true },
								title: 'Haircut',
								subtitle: '$40 | 1hr',
								note: 'Vicenta Maggio',
								contextMenu: {
									icon: { name: 'edit', isLineIcon: true },
									isSimple: true,
									isSmall: true,
									size: 'large',
									actions: [
										{
											text: 'Change teammate'
										},
										{
											text: 'Remove from appointment'
										}
									]
								}
							}
						],
						action: {
							icon: { name: 'add' },
							text: 'Add services'
						}
					}
				},
				{
					id: 'status',
					component: 'list',
					componentProps: {
						items: [
							{
								icon: { name: 'status' },
								title: 'Status',
								subtitle: 'Confirmed',
								isExpandable: true
							}
						]
					}
				},
				{
					id: 'subtotal',
					component: 'list',
					componentProps: {
						items: [
							{
								title: 'Subtotal: $105'
							},
							{
								title: 'Duration: 2hr'
							}
						]
					}
				},
				{
					id: 'primaryCTA',
					component: 'button',
					componentProps: {
						text: 'Check guest in',
						kind: 'primary',
						isFullWidth: true
					}
				}
			]}
		/>
	</Sidebar>
))
