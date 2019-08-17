// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react'
import Page from './index'
import { manyTabs } from '../../../.storybook/data/tabs'
import Layout from '../Layout/Layout'

import README from './README.md'

const buttonKinds = {
	Primary: 'primary',
	Secondary: 'secondary',
	Simple: 'simple'
}

const stories = storiesOf('Page', module).addParameters({
	readme: {
		sidebar: README
	}
})

stories.addDecorator(withKnobs)

stories
	.add('Page', () => (
		<Page
			header={{
				className: 'custom-classname',
				title: text('title', 'Page Title'),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<Page.Content>
				<Layout>
					<Layout.Section>
						See Layout for examples of page layouts.
					</Layout.Section>
				</Layout>
			</Page.Content>
		</Page>
	))
	.add('With Back Link', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<Page.Content>
				<Layout>
					<Layout.Section>
						See Layout for examples of page layouts.
					</Layout.Section>
				</Layout>
			</Page.Content>
		</Page>
	))
	.add('With Primary Action', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				primaryAction: {
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: text('icon', ''),
					isSmall: boolean('isSmall', true)
				},
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<Page.Content>
				<Layout>
					<Layout.Section>
						See Layout for examples of page layouts.
					</Layout.Section>
				</Layout>
			</Page.Content>
		</Page>
	))
	.add('With Back Link & Primary Action', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				primaryAction: {
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: text('icon', ''),
					isSmall: boolean('isSmall', true)
				},
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<Page.Content>
				<Layout>
					<Layout.Section>
						See Layout for examples of page layouts.
					</Layout.Section>
				</Layout>
			</Page.Content>
		</Page>
	))
	.add('Within flexible container', () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flex: 1,
				overflow: 'hidden',
				height: '50vh'
			}}
		>
			<Page
				header={{
					title: text('title', 'Page Title'),
					backLinkHref: '#',
					backLinkText: text('backLinkText', 'Back'),
					primaryAction: {
						text: boolean('text', 'Do something'),
						kind: select('kind', buttonKinds, 'primary'),
						icon: text('icon', ''),
						isSmall: boolean('isSmall', true)
					},
					hasBottomBorder: boolean('hasBottomBorder', false),
					collapsed: boolean('isCollapsed', false)
				}}
			>
				<Page.Content>
					<Layout width="full-width">
						<Layout.Section>
							See Layout for examples of page layouts. Lorem ipsum dolor sit
							amet, consectetur adipiscing elit. Vestibulum dapibus dapibus
							risus vel aliquet. Nam interdum lectus a massa aliquam, rutrum
							venenatis odio volutpat. Ut aliquet tellus consequat suscipit
							blandit. Praesent tempor nulla eget odio consequat scelerisque.
							Donec tellus massa, lacinia in neque non, vehicula accumsan
							tortor. Praesent a ipsum in elit tempus cursus in ut velit. Nullam
							pellentesque interdum metus, nec condimentum justo bibendum porta.
							Nullam id erat non dolor fringilla auctor. Nulla at orci at nunc
							facilisis fermentum. Mauris nunc lectus, tempor id feugiat id,
							malesuada sit amet augue. Vestibulum sollicitudin nisl finibus,
							maximus ex ac, suscipit ex. In elementum magna eu lacinia
							tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Vestibulum ante ipsum primis in faucibus orci luctus et
							ultrices posuere cubilia Curae; Aliquam enim sapien, placerat ut
							dapibus quis, auctor eget metus. Vivamus convallis metus in
							malesuada fermentum. Donec et orci nulla. Phasellus hendrerit odio
							mi, non eleifend est pretium a. Aliquam sapien urna, sodales
							pulvinar tristique a, mattis sit amet sapien. Aliquam eget nunc
							eget tortor iaculis laoreet sit amet at urna. Morbi eu mollis
							risus. Phasellus nibh purus, fermentum tempor lacus quis, molestie
							molestie quam. Donec id risus sem. Mauris sit amet enim sapien.
							Sed orci orci, eleifend feugiat mauris eget, rhoncus egestas leo.
							Fusce sit amet turpis egestas, aliquam augue ac, laoreet nunc.
							Fusce malesuada mi odio, sit amet blandit odio vulputate ac. Duis
							a odio ut lectus ullamcorper fringilla vitae eu urna. Duis et
							dolor porttitor, auctor urna vitae, bibendum orci. Mauris vitae
							arcu placerat, tristique massa nec, euismod augue. Suspendisse
							maximus finibus cursus. Vestibulum ante ipsum primis in faucibus
							orci luctus et ultrices posuere cubilia Curae; Morbi sed dui ac
							urna ultricies fermentum eget vel ipsum. Nam non ullamcorper
							risus. Curabitur vulputate ante at facilisis venenatis.
							Suspendisse nulla risus, tincidunt aliquam nisl ut, porttitor
							tempor nibh. Maecenas at urna vel enim euismod fringilla ac vel
							purus. Praesent ut tempus erat. Cras viverra porta nisi, in
							lacinia justo tincidunt ac. Fusce bibendum sit amet mi vitae
							volutpat. Fusce fringilla id elit non sollicitudin. Phasellus
							mollis placerat dapibus. Integer scelerisque pharetra massa vel
							ultrices. Integer velit ex, semper eget auctor in, sodales id
							diam. Suspendisse eu dui dui. In sodales semper risus, eu euismod
							quam venenatis sit amet. Cras lobortis urna elementum dapibus
							dapibus. In mattis facilisis malesuada.
						</Layout.Section>
					</Layout>
				</Page.Content>
			</Page>
		</div>
	))
	.add('With many tabs', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				tabs: manyTabs,
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<Page.Content>
				<Layout>
					<Layout.Section>
						See Layout for examples of page layouts.
					</Layout.Section>
				</Layout>
			</Page.Content>
		</Page>
	))
