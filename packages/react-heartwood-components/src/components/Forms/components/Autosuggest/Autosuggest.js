// @flow
import React, { Component, Fragment } from 'react'
import { default as ReactAutosuggest } from 'react-autosuggest'
import cx from 'classnames'
import Button from '../../../Button/Button'
import { InputPre, InputHelper } from '../../FormPartials'
import type { InputPreProps, InputHelperProps } from '../../FormPartials'
import ClearIcon from '../../../../../static/assets/icons/ic_cancel.svg'

export type Props = {
	/** Unique identifier */
	id: string,

	/** Teach Autosuggest how to calculate suggestions for any given input value. */
	getSuggestions: (value: string) => Promise<Array<Object>> | null,

	/** Implement it to teach Autosuggest what should be the input value when suggestion is clicked. */
	getSuggestionValue: Function,

	/** Defines how suggestions will be rendered */
	renderSuggestion: Function,

	/** Will be called every time suggestion is selected via mouse or keyboard. */
	onSuggestionSelected: Function,

	/** Supply default suggestions that can be shown without input */
	defaultSuggestions?: Array<any>,

	/** Placeholder for the input */
	placeholder?: string,

	/** optionally pass a default value for this input */
	defaultValue?: string,

	/** optional label */
	label?: string,

	/** Text after label */
	postLabel?: string,

	/** Error text */
	error?: string,

	/** Helper text */
	helper?: string,

	/** Set true to make the input less tall */
	isSmall?: boolean,

	/** Adds a class to the Autosuggest's wrapper */
	wrapperClassName?: string,

	/** passed through to react autosuggest */
	inputProps?: Object,

	/** optional class name for wrapper */
	className?: string
}

type State = {
	value: string,
	suggestions: Array<any>,
	showClearButton: boolean
}

type ThemeProps = {
	isSmall?: boolean
}

const theme = (props: ThemeProps) => ({
	container: cx('text-input', {
		'text-input-small': props.isSmall
	}),
	input: 'text-input__inner text-input__input',
	suggestionsContainer: 'autosuggest',
	suggestionsContainerOpen: 'autosuggest--show-suggestions',
	suggestionsList: 'autosuggest__list',
	suggestion: 'autosuggest__list-item'
})

export default class Autosuggest extends Component<Props, State> {
	static defaultProps = {
		defaultSuggestions: []
	}

	constructor(props: Props) {
		super(props)

		this.state = {
			value: props.defaultValue || '',
			suggestions: this.props.defaultSuggestions || [],
			showClearButton: false
		}
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

	onSuggestionsFetchRequested = async ({ value }: any) => {
		// Do some stuff to get suggestions
		// May be async/passed by parent
		const { getSuggestions } = this.props
		const suggestions = await getSuggestions(value)
		this.setState({
			suggestions: suggestions || []
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
			onSuggestionSelected,
			placeholder,
			label,
			error,
			helper,
			isSmall,
			id,
			postLabel,
			wrapperClassName,
			inputProps: originalInputProps = {},
			className,
			...rest
		} = this.props

		const inputProps = {
			...originalInputProps,
			placeholder: originalInputProps.placeholder || placeholder || '',
			value: originalInputProps.value || value,
			onChange: originalInputProps.onChange || this.onChange,
			onBlur: originalInputProps.onBlur || this.onBlur
		}

		const parentClass = cx('text-input', {
			className,
			'text-input--has-error': error
		})

		return (
			<div className={parentClass}>
				{label && <InputPre label={label} id={id} postLabel={postLabel} />}
				<div className={cx('autosuggest__wrapper', wrapperClassName)}>
					<ReactAutosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						onSuggestionSelected={onSuggestionSelected}
						inputProps={inputProps}
						theme={theme({ isSmall })}
						{...rest}
					/>
					{showClearButton && (
						<Button
							isSmall
							className="text-input__clear-btn"
							icon={{
								customIcon: ClearIcon
							}}
							onClick={this.handleClearInput}
						/>
					)}
				</div>
				{(helper || error) && <InputHelper helper={helper} error={error} />}
			</div>
		)
	}
}
