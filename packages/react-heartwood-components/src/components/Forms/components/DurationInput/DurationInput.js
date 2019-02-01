// @flow
import React, { Component } from 'react'
import { range, findIndex } from 'lodash'
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
	defaultValue?: number,

	/** title rendered when no results are found */
	noResultsTitle?: string,

	/** subtitle rendered when no results are found */
	noResultsSubtitle?: string,

	/** pass an error message to the input, this is show only after a valid duration is selected */
	error?: string
} & AutoSuggestProps

type State = {
	value: string,
	validationError: ?string
}

export default class DurationInput extends Component<Props, State> {
	static defaultProps = {
		minMinutes: 5,
		maxMinutes: 180,
		skipMinutes: 5,
		noResultsTitle: 'Invalid duration.',
		noResultsSubtitle: 'Please adjust your search and try again.'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			value:
				props.defaultValue || props.value
					? this.minutesToStr(props.defaultValue || props.value)
					: '',
			validationError: null
		}
	}

	renderSuggestion = (suggestion: any) => {
		if (suggestion.isEmptyMessage) {
			const { noResultsTitle, noResultsSubtitle } = this.props
			return (
				<div className="autosuggest__no-results">
					<p className="autosuggest__no-results-title">{noResultsTitle}</p>
					<p className="autosuggest__no-results-subtitle">
						{noResultsSubtitle}
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
		return range(min, max + skip, skip).map(minutes => {
			const duration = this.minutesToStr(minutes)
			return {
				text: duration,
				search: duration.replace(/[^0-9hm]/g, ''),
				minutes
			}
		})
	})

	minutesToStr = (num: number): string => {
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

	strToMinutes = (str: string): number => {
		const { minMinutes, maxMinutes, skipMinutes } = this.props
		const suggestions = this.generateSuggestions(
			minMinutes,
			maxMinutes,
			skipMinutes
		)
		const idx = findIndex(suggestions, suggestion => suggestion.text === str)

		const suggestion = suggestions[idx]
		return suggestion.minutes
	}

	handleChange = e => {
		const { value } = e.target
		this.setState({ value })
	}

	handleBlur = e => {
		const { onBlur } = this.props
		const { onChange } = this.props

		const value = e.target.value
		const matches = this.searchSuggestions(value)
		if (value.length > 0 && matches.length > 0) {
			this.setState({ value: matches[0].text, validationError: null })
			// only fire on change if the new value is valid
			onChange && onChange(this.strToMinutes(matches[0].text), e)
		} else if (value.length > 0) {
			this.setState({ validationError: 'You must select a valid duration.' })
		}

		onBlur && onBlur(e)
	}

	handleGetSuggestions = value => {
		const matches = this.searchSuggestions(value)
		// Here you could add click events to buttons or whatever else they need
		// No Results Message
		if (matches.length === 0) {
			return [
				{
					text: 'NO RESULTS',
					isEmptyMessage: true
				}
			]
		}
		return matches
	}

	searchSuggestions = memoize(
		(value): Array<string> => {
			const { minMinutes, maxMinutes, skipMinutes } = this.props

			const search = value.replace(/[^0-9hm]/g, '')

			// we typed something, but it was nothing valid
			if (value.length > 0 && search.length === 0) {
				return []
			}

			const suggestions = this.generateSuggestions(
				minMinutes,
				maxMinutes,
				skipMinutes
			)

			const results = suggestions.filter(
				suggestion => suggestion.search.search(search) > -1
			)

			return results
		}
	)

	handleSelectSuggestion = (e, suggestion) => {
		this.setState({ value: suggestion.suggestionValue })
	}

	render() {
		const { minMinutes, maxMinutes, skipMinutes, error, ...props } = this.props

		const { value, validationError } = this.state

		const suggestions = this.generateSuggestions(
			minMinutes,
			maxMinutes,
			skipMinutes
		)

		return (
			<Autosuggest
				inputProps={{
					value: value,
					onChange: this.handleChange,
					onBlur: this.handleBlur
				}}
				error={validationError || error}
				defaultSuggestions={suggestions}
				shouldRenderSuggestions={() => true}
				renderSuggestion={this.renderSuggestion}
				getSuggestionValue={value => value.text}
				getSuggestions={this.handleGetSuggestions}
				onSuggestionSelected={this.handleSelectSuggestion}
				{...props}
			/>
		)
	}
}
