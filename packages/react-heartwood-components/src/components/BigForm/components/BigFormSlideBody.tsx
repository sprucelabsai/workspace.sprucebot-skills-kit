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
}

class BigFormSlideBody extends React.Component<IBigFormSlideBodyProps> {
	bodyRef = React.createRef<HTMLDivElement>()

	public focus = () => {
		if (this.bodyRef.current) {
			const input = this.bodyRef.current.querySelector('.input-wapper input')
			if (input && (input as HTMLInputElement).focus) {
				;(input as HTMLInputElement).focus()
			}
		}
	}
	public blur = () => {}
	public render(): React.ReactElement {
		const { children, answerType, placeholder } = this.props
		let input

		switch (answerType) {
			case 'text':
				input = <TextInput id="input" placeholder={placeholder} />
				break
		}

		return (
			<div className={cx('slide-body')} ref={this.bodyRef}>
				{children}
				{input && <div className={'input-wrapper'}>{input}</div>}
			</div>
		)
	}
}

export default BigFormSlideBody
