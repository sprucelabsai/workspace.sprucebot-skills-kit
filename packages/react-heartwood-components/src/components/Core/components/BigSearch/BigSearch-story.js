// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import BigSearch from '../BigSearch/BigSearch'

import {
	recentSearchResults,
	suggestedSearchResults,
	searchResults
} from '../../../../../.storybook/data/searchData'

const stories = storiesOf('Big Search', module)

stories.addDecorator(withKnobs)
stories.add('Default', () => {
	return (
		<BigSearch
			isVisible={true}
			initialSearchResults={recentSearchResults}
			getSearchSuggestions={async () => suggestedSearchResults}
			getSearchResults={async () => searchResults}
		/>
	)
})
