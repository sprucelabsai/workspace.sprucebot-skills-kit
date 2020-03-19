import React, { ReactElement } from 'react'
import cx from 'classnames'
import BigFormSlide, { BigFormSlidePosition } from './components/BigFormSlide'
import BigFormSlideBody from './components/BigFormSlideBody'
import BigFormSlideHeader from './components/BigFormSlideHeader'
import BigFormControls from './components/BigFormControls'

export enum BigFormTransitionStyle {
	Stack = 'stack',
	SlideLeft = 'slide-left',
	SlideUp = 'slide-up',
	Swap = 'swap'
}

interface IBigFormProps {
	/** should the same sprucebot just delete and retype messages */
	useOneSprucebot?: boolean

	/** transition style */
	transitionStyle?: BigFormTransitionStyle

	/** which slide is selected? */
	currentSlide?: number

	/** children should be big form slides */
	children?: React.ReactNode

	/** can go back a step (unless) */
	canGoBack?: boolean

	/** can go to the next step? */
	canGoNext?: boolean

	/** called when hitting back butto */
	onBack?: () => void

	/** called when hitting next button */
	onNext?: () => void
}

interface IBigFormState {}

class BigForm extends React.Component<IBigFormProps, IBigFormState> {
	/** a slide for the form */
	public static Slide = BigFormSlide
	/** the body of a slide */
	public static SlideBody = BigFormSlideBody
	/** the header for a slide (uses sprucebot typed question) */
	public static SlideHeader = BigFormSlideHeader

	public static defaultProps = {
		currentSlide: 0,
		canGoBack: false,
		canGoNext: false,
		transitionStyle: BigFormTransitionStyle.Stack
	}

	/** the scroll frame for scrolling left/right */
	bigFormRef = React.createRef<HTMLDivElement>()
	slideRefs: BigFormSlide[] = []

	public componentDidMount = () => {
		this.updateSlideFocus()
	}

	componentDidUpdate = (prevProps: IBigFormProps) => {
		if (prevProps.currentSlide !== this.props.currentSlide) {
			this.updateSlideFocus()
		}
	}

	public updateSlideFocus = () => {
		const { currentSlide } = this.props
		this.slideRefs.forEach((slideRef, idx) => {
			if (idx === currentSlide) {
				slideRef.focus()
			} else {
				slideRef.blur()
			}
		})
	}

	public render(): React.ReactElement {
		const {
			children: childrenProps,
			currentSlide = 0,
			canGoBack,
			canGoNext,
			onBack,
			onNext,
			transitionStyle
		} = this.props

		const children = React.Children.map(childrenProps, (child, idx) => {
			if (
				child &&
				(child as ReactElement).type &&
				(child as ReactElement).type === BigFormSlide
			) {
				let position = BigFormSlidePosition.Present
				if (idx < currentSlide) {
					position = BigFormSlidePosition.Past
				} else if (idx > currentSlide) {
					position = BigFormSlidePosition.Future
				}
				return React.cloneElement(child as ReactElement, {
					position,
					ref: ref => (this.slideRefs[idx] = ref)
				})
			}
			return child
		})

		return (
			<div className={cx('big-form', transitionStyle)} ref={this.bigFormRef}>
				{children}
				<BigFormControls
					canGoBack={canGoBack}
					canGoNext={canGoNext}
					onNext={onNext}
					onBack={onBack}
				/>
			</div>
		)
	}
}

export default BigForm
