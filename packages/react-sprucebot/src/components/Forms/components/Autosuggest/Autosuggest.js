// @flow
import React, { Component } from 'react'
import { default as ReactAutosuggest } from 'react-autosuggest'

type Props = {
	getSuggestions: Function,
	getSuggestionValue: Function,
	defaultSuggestions?: Array<any>,
	placeholder?: string
}

type State = {
	value: string,
	suggestions: Array<any>
}

const renderSuggestion = (suggestion: any) => <div>{suggestion}</div>

export default class Autosuggest extends Component<Props, State> {
	static defaultProps = {
		defaultSuggestions: []
	}
	state = {
		value: '',
		suggestions: this.props.defaultSuggestions || []
	}

	onChange = (event: any, { newValue }: any) => {
		this.setState({
			value: newValue
		})
	}

	onSuggestionsFetchRequested = ({ value }: any) => {
		// Do some stuff to get suggestions
		// May be async/passed by parent
		const { getSuggestions } = this.props
		const suggestions = getSuggestions(value)
		this.setState({
			suggestions
		})
	}

	onSuggestionsClearRequested = () => {
		const { defaultSuggestions } = this.props
		this.setState({
			suggestions: defaultSuggestions
		})
	}

	render() {
		const { value, suggestions } = this.state
		const { getSuggestionValue, placeholder, ...rest } = this.props
		const inputProps = {
			placeholder: placeholder || '',
			value,
			onChange: this.onChange
		}

		return (
			<ReactAutosuggest
				suggestions={suggestions}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				{...rest}
			/>
		)
	}
}
