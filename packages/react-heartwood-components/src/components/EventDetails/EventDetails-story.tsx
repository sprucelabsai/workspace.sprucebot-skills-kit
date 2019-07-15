import React from 'react'
import { storiesOf } from '@storybook/react'

import { Sidebar } from '../Core'
import EventDetails from './EventDetails'

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
				}
			]}
		/>
	</Sidebar>
))
