import React from 'react'
import cx from 'classnames'
import { TextInput } from '../../Forms'

export interface IBigFormSlideBodyProps {
	/** what type of question are you asking */
	answerType: string

	/** any other children you want passed through */
	children?: React.ReactNode

	/** what i the placeholder on the input */
	placeholder?: string

	/** called when trying to submit a step (probably hitting return on an input) */
	onSubmit?: <T>(value: T | null) => void
}

class BigFormSlideBody extends React.Component<IBigFormSlideBodyProps> {
	inputRef = React.createRef<TextInput & HTMLInputElement>()

	public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const value = this.inputRef.current && this.inputRef.current.value
		this.props.onSubmit && this.props.onSubmit(value)
	}

	public focus = (options?: FocusOptions) => {
		this.inputRef.current && this.inputRef.current.focus(options)
	}

	public blur = () => {}

	public render(): React.ReactElement {
		const { children, answerType, placeholder } = this.props
		let input

		switch (answerType) {
			case 'text':
				input = (
					<TextInput id="input" placeholder={placeholder} ref={this.inputRef} />
				)
				break
		}

		return (
			<div className={cx('slide-body')}>
				{children}
				{input && (
					<form onSubmit={this.handleSubmit} className={'input-wrapper'}>
						{input}
					</form>
				)}
			</div>
		)
	}
}

export default BigFormSlideBody
