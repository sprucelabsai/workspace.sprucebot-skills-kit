// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import BigSearch from '../BigSearch/BigSearch'

const stories = storiesOf('Big Search', module)

import user01image from '../../../../../static/assets/users/user-01--96w.png'
import user02image from '../../../../../static/assets/users/user-02--96w.png'
import user03image from '../../../../../static/assets/users/user-03--96w.png'
import user04image from '../../../../../static/assets/users/user-04--96w.png'
import user05image from '../../../../../static/assets/users/user-05--96w.png'
import user06image from '../../../../../static/assets/users/user-06--96w.png'

const recentSearchResults = [
	{
		header: {
			title: 'Recent Searches'
		},
		items: [
			{
				avatar: user01image,
				title: 'Lacey Morissette',
				subtitle: 'Guest',
				actions: []
			},
			{
				avatar: user02image,
				title: 'Jade Mohr',
				subtitle: 'Stylist',
				actions: []
			},
			{
				avatar: user03image,
				title: 'Gianni Block',
				subtitle: 'Guest',
				actions: []
			}
		]
	}
]

const suggestedSearchResults = [
	{
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Guest',
				actions: []
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Guest',
				actions: []
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Manager',
				actions: []
			}
		]
	}
]

const searchResults = [
	{
		text: 'Guests',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Guest',
				actions: []
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Guest',
				actions: []
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Guest',
				actions: []
			}
		]
	},
	{
		text: 'Teammates',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Stylist',
				actions: []
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Manager',
				actions: []
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Teammate',
				actions: []
			}
		]
	},
	{
		text: 'Shopify Customers',
		items: [
			{
				avatar: user04image,
				title: 'Vicenta Maggio',
				subtitle: 'Customer since 03/18',
				actions: []
			},
			{
				avatar: user05image,
				title: 'Vicenta Ramirez',
				subtitle: 'Customer since 07/14',
				actions: []
			},
			{
				avatar: user06image,
				title: 'Allison Vicenta',
				subtitle: 'Customer since 01/19',
				actions: []
			}
		]
	}
]

stories.addDecorator(withKnobs)
stories
	.add('Default', () => {
		return (
			<BigSearch isVisible={true} initialSearchResults={recentSearchResults} />
		)
	})
	.add('Suggested Search Results', () => {
		return (
			<BigSearch
				isVisible={true}
				initialSearchResults={recentSearchResults}
				suggestedSearchResults={suggestedSearchResults}
			/>
		)
	})
	.add('Search Results', () => {
		return (
			<BigSearch
				isVisible={true}
				initialSearchResults={recentSearchResults}
				suggestedSearchResults={suggestedSearchResults}
				searchResults={searchResults}
			/>
		)
	})
