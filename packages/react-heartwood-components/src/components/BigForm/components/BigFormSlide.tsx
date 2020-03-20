import React, { ReactElement } from 'react'
import cx from 'classnames'
import BigFormSlideHeader from './BigFormSlideHeader'
import BigFormSlideBody from './BigFormSlideBody'

export enum BigFormSlidePosition {
	Past = 'past',
	Present = 'present',
	Future = 'future'
}

export interface IBigFormSlideProps {
	/** our position in the show */
	position?: BigFormSlidePosition

	/** should container a header and body */
	children?: React.ReactNode

	/** called when submitting a step, probably hitting return in a text field */
	onSubmit?: <T>(value: T | null) => void
}

class BigFormSlide extends React.Component<IBigFormSlideProps> {
	headerRef = React.createRef<BigFormSlideHeader>()
	bodyRef = React.createRef<BigFormSlideBody>()

	public focus = (options?: FocusOptions) => {
		this.headerRef.current && this.headerRef.current.focus()
		setTimeout(() => {
			this.bodyRef.current && this.bodyRef.current.focus(options)
		}, 1000)
	}

	public blur = () => {
		this.headerRef.current && this.headerRef.current.blur()
	}

	public render(): React.ReactElement {
		const { children: childrenProp, position, onSubmit } = this.props

		const children = React.Children.map(childrenProp, child => {
			if (
				child &&
				(child as ReactElement).type &&
				((child as ReactElement).type === BigFormSlideHeader ||
					(child as ReactElement).type === BigFormSlideBody)
			) {
				const props =
					(child as ReactElement).type === BigFormSlideHeader
						? {
								ref: this.headerRef
						  }
						: {
								ref: this.bodyRef,
								onSubmit
						  }

				return React.cloneElement(child as ReactElement, props)
			}

			return child
		})

		return (
			<div
				className={cx('slide', {
					'is-past': position === BigFormSlidePosition.Past,
					'is-present': position === BigFormSlidePosition.Present,
					'is-future': position === BigFormSlidePosition.Future
				})}
			>
				{children}
			</div>
		)
	}
}

export default BigFormSlide
