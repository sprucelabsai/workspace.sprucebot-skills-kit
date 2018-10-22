// @flow
import React, { Component, Fragment } from 'react'
import { default as ReactAutosuggest } from 'react-autosuggest'
import Button from '../../../Button/Button'
import {
	InputPre,
	InputPreProps,
	InputHelper,
	InputHelperProps
} from '../../FormPartials'
import ClearIcon from '../../../../../static/assets/icons/ic_cancel.svg'

type Props = {
	getSuggestions: Function,
	getSuggestionValue: Function,
	renderSuggestion: Function,
	defaultSuggestions?: Array<any>,
	placeholder?: string,
	inputPre?: InputPreProps,
	inputHelper?: InputHelperProps
}

type State = {
	value: string,
	suggestions: Array<any>,
	showClearButton: boolean
}

const theme = {
	container: 'text-input',
	input: 'text-input__inner text-input__input',
	suggestionsContainer: 'autosuggest',
	suggestionsContainerOpen: 'autosuggest--show-suggestions',
	suggestionsList: 'autosuggest__list',
	suggestion: 'autosuggest__list-item'
}

export default class Autosuggest extends Component<Props, State> {
	static defaultProps = {
		defaultSuggestions: []
	}
	state = {
		value: '',
		suggestions: this.props.defaultSuggestions || [],
		showClearButton: false
	}

	onChange = (event: any, { newValue }: any) => {
		this.setState({
			value: newValue
		})
	}

	onBlur = (event: any) => {
		this.setState(prevState => ({
			showClearButton:
				prevState.value && prevState.value.length > 0 ? true : false
		}))
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

	handleClearInput = () => {
		this.setState({
			value: '',
			showClearButton: false
		})
	}

	render() {
		const { value, suggestions, showClearButton } = this.state
		const {
			getSuggestionValue,
			renderSuggestion,
			placeholder,
			inputPre,
			inputHelper,
			...rest
		} = this.props
		const inputProps = {
			placeholder: placeholder || '',
			value,
			onChange: this.onChange,
			onBlur: this.onBlur
		}

		return (
			<Fragment>
				{inputPre && <InputPre {...inputPre} />}
				<div className="autosuggest__wrapper">
					<ReactAutosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
						theme={theme}
						{...rest}
					/>
					{showClearButton && (
						<Button
							isSmall
							className="text-input__clear-btn"
							icon={<ClearIcon />}
							onClick={this.handleClearInput}
						/>
					)}
				</div>
				{inputHelper && <InputHelper {...inputHelper} />}
			</Fragment>
		)
	}
}
