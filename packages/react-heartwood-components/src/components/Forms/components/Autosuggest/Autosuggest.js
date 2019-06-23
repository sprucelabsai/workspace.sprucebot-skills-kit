// @flow
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import debounce from 'lodash/debounce'
import { default as ReactAutosuggest } from 'react-autosuggest'
import cx from 'classnames'
import Button from '../../../Button/Button'
import { InputPre, InputHelper } from '../../FormPartials'
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
	postLabel?: string | Node,

	/** Error text */
	error?: string,

	/** Helper text */
	helper?: string | Node,

	/** Set true to make the input less tall */
	isSmall?: boolean,

	/** Adds a class to the Autosuggest's wrapper */
	wrapperClassName?: string,

	/** passed through to react autosuggest */
	inputProps?: Object,

	/** optional class name for wrapper */
	className?: string,

	/** disable this input */
	disabled?: boolean
}

type State = {
	value: string,
	suggestions: Array<any>,
	showClearButton: boolean,
	containerPlacement: {
		top: number,
		left: number,
		width: number
	}
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
	domNodeRef = React.createRef()
	autosuggestRef = React.createRef()

	static defaultProps = {
		defaultSuggestions: []
	}

	debouncedResize = debounce(() => this.handleWindowResize(), 500)

	constructor(props: Props) {
		super(props)

		this.state = {
			value: props.defaultValue || '',
			suggestions: this.props.defaultSuggestions || [],
			showClearButton: false,
			containerPlacement: {
				top: 0,
				left: 0,
				width: 0
			}
		}
	}

	componentDidMount = () => {
		this.getContainerPlacement()
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', this.debouncedResize, false)
		}
	}

	componentWillUnmount = () => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.debouncedResize, false)
		}
	}

	getContainerPlacement = () => {
		const input =
			this.autosuggestRef &&
			this.autosuggestRef.current &&
			this.autosuggestRef.current.input

		if (!document) {
			return
		}

		// For scrollX and scrollY cross-browser compatibility
		let docEl =
			document.scrollingElement ||
			document.documentElement ||
			document.body.parentNode

		const scrollX = (typeof docEl.scrollLeft === 'number'
			? docEl
			: document.body
		).scrollLeft

		const scrollY = (typeof docEl.scrollTop === 'number'
			? docEl
			: document.body
		).scrollTop

		if (!input) {
			return
		}

		const inputPosition = input.getBoundingClientRect()

		this.setState({
			containerPlacement: {
				top: inputPosition.y + inputPosition.height + scrollY,
				left: inputPosition.x + scrollX,
				width: inputPosition.width
			}
		})
	}

	handleWindowResize = () => {
		this.getContainerPlacement()
	}

	onChange = (event: any, { newValue }: any) => {
		this.setState({
			value: newValue
		})
	}

	onBlur = () => {
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
		await this.setState({
			suggestions: suggestions || []
		})

		this.getContainerPlacement()
		this.scrollParentIfNeeded()
	}

	onSuggestionsClearRequested = () => {
		const { defaultSuggestions } = this.props
		this.setState({
			suggestions: defaultSuggestions
		})
	}

	scrollParentIfNeeded = () => {
		const autosuggestRef = this.autosuggestRef && this.autosuggestRef.current
		const suggestionsContainer =
			autosuggestRef && autosuggestRef.suggestionsContainer

		const autosuggestInput =
			autosuggestRef &&
			autosuggestRef.autowhatever &&
			autosuggestRef.autowhatever.input

		if (
			suggestionsContainer &&
			autosuggestInput &&
			this.domNodeRef &&
			this.domNodeRef.current
		) {
			const overflowParent =
				this.findOverflowParent(this.domNodeRef.current) || document.body
			const overflowBox = overflowParent.getBoundingClientRect()
			const overflowBoxBottom = overflowBox.top + overflowBox.height
			const suggestionsBox = suggestionsContainer.getBoundingClientRect()
			const suggestionsBottom = suggestionsBox.top + suggestionsBox.height

			let isSmoothScrollSupported =
				'scrollBehavior' in document.documentElement.style

			if (suggestionsBottom > overflowBoxBottom) {
				const inputTop = autosuggestInput.getBoundingClientRect().top
				const scrollNode =
					overflowParent === document.body ? window : overflowParent
				if (isSmoothScrollSupported) {
					scrollNode.scrollTo({
						top: inputTop,
						behavior: 'smooth'
					})
				} else {
					scrollNode.scrollTo(0, inputTop)
				}
			}
		}
	}

	findOverflowParent = node => {
		if (node == null || typeof node === 'undefined' || node.nodeType !== 1) {
			return null
		}

		const computedStyle = window.getComputedStyle(node)

		if (computedStyle.overflow !== 'visible') {
			return node
		} else {
			return this.findOverflowParent(node.parentNode)
		}
	}

	handleClearInput = () => {
		this.setState({
			value: '',
			showClearButton: false
		})
	}

	render() {
		const {
			value,
			suggestions,
			showClearButton,
			containerPlacement
		} = this.state
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
			disabled,
			...rest
		} = this.props

		const inputProps = {
			...originalInputProps,
			placeholder: originalInputProps.placeholder || placeholder || '',
			value: originalInputProps.value || value,
			onChange: originalInputProps.onChange || this.onChange,
			onBlur: originalInputProps.onBlur || this.onBlur,
			disabled
		}

		const parentClass = cx('text-input', {
			className,
			'text-input--has-error': error
		})

		return (
			<div className={parentClass} ref={this.domNodeRef}>
				{label && <InputPre label={label} id={id} postLabel={postLabel} />}
				<div className={cx('autosuggest__wrapper', wrapperClassName)}>
					<ReactAutosuggest
						ref={this.autosuggestRef}
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						renderSuggestionsContainer={({ containerProps, children }) => {
							return createPortal(
								<div
									style={{
										top: `${containerPlacement.top + 8}px`,
										left: `${containerPlacement.left}px`,
										width: `${containerPlacement.width}px`
									}}
									{...containerProps}
								>
									{children}
								</div>,
								document.body
							)
						}}
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
