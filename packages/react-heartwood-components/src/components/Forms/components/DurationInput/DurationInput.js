// @flow
import React, { Component, Fragment } from 'react'
import { range } from 'lodash'
import memoize from 'memoize-one'

import Autosuggest from '../Autosuggest/Autosuggest'
import Button from '../../../Button/Button'

import type { Props as AutoSuggestProps } from '../Autosuggest/Autosuggest'

type Props = {
	/** minimum time someone can select */
	minMinutes?: number,

	/** maximum time someone can select */
	maxMinutes?: number,

	/** when generating suggestions, how much much time is there between suggestions */
	skipMinutes?: number,

	/** Default value (in minutes)  */
	defaultValue?: number
} & AutoSuggestProps

export default class DurationInput extends Component<Props> {
	static defaultProps = {
		minMinutes: 5,
		maxMinutes: 180,
		skipMinutes: 5
	}

	constructor(props: Props) {
		super(props)
	}

	renderSuggestion = (suggestion: any) => {
		if (suggestion.isEmptyMessage) {
			return (
				<div className="autosuggest__no-results">
					<p className="autosuggest__no-results-title">
						No matching countries found.
					</p>
					<p className="autosuggest__no-results-subtitle">
						Please adjust your search and try again.
					</p>
				</div>
			)
		}
		return (
			<Button
				isSmall
				className="autosuggest__list-item-inner"
				text={suggestion.text}
			/>
		)
	}

	generateSuggestions = memoize((min, max, skip) => {
		return range(min, max, skip)
			.map(this.transformMinutes)
			.map(duration => ({
				text: duration,
				search: duration.replace(/[^0-9hm]/g, '')
			}))
	})

	transformMinutes = (num: number): string => {
		let hours = Math.floor(num / 60)
		let minutes = num % 60

		let value = ''

		if (hours > 0) {
			value += `${hours}hr`
		}

		if (minutes > 0) {
			value += `${minutes}min`
		}

		return value.trim()
	}

	render() {
		const {
			minMinutes,
			maxMinutes,
			skipMinutes,
			defaultValue,
			...props
		} = this.props
		const suggestions = this.generateSuggestions(
			minMinutes,
			maxMinutes,
			skipMinutes
		)

		console.log(suggestions, defaultValue)

		return (
			<Autosuggest
				defaultValue={defaultValue && this.transformMinutes(defaultValue)}
				defaultSuggestions={suggestions}
				shouldRenderSuggestions={() => true}
				renderSuggestion={this.renderSuggestion}
				getSuggestionValue={value => value.text}
				getSuggestions={value => {
					const search = value.replace(/[^0-9hm]/g, '')

					const results = suggestions.filter(
						suggestion => suggestion.search.search(search) > -1
					)
					// Here you could add click events to buttons or whatever else they need
					// No Results Message
					if (results.length === 0) {
						return [
							{
								text: 'NO RESULTS',
								isEmptyMessage: true
							}
						]
					}
					return results
				}}
				{...props}
			/>
		)
	}
}
