import React, { ReactElement } from 'react'
import cx from 'classnames'
import BigFormSlide, { BigFormSlidePosition } from './components/BigFormSlide'
import BigFormSlideBody from './components/BigFormSlideBody'
import BigFormSlideHeader, {
	IBigFormSlideHeaderProps
} from './components/BigFormSlideHeader'
import BigFormControls from './components/BigFormControls'
import SprucebotTypedMessage from '../SprucebotTypedMessage/SprucebotTypedMessage'
import {
	IHWSprucebotTypedMessageSize,
	IHWSprucebotAvatarStateOfMind
} from '@sprucelabs/spruce-types'

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

	/** called when hitting next button or hitting enter in a text field */
	onNext?: () => void
}

interface IBigFormState {
	/** this is what actually drives the
	 * selected slide, delayed from prop
	 * changes to handle positioning before
	 * transition */
	currentSlide: number
}

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

	bigFormRef = React.createRef<HTMLDivElement>()
	slideRefs: BigFormSlide[] = []
	theOneSprucebotRef = React.createRef<SprucebotTypedMessage>()

	/** all the header props when usingOneSprucebot */
	headerProps: IBigFormSlideHeaderProps[] = []

	constructor(props: IBigFormProps) {
		super(props)
		this.state = {
			currentSlide: this.props.currentSlide || 0
		}
	}

	public componentWillMount = () => {
		this.headerProps = this.getHeaderProps()
	}
	public componentDidMount = () => {
		this.jumpToSlide(this.props.currentSlide || 0)
	}

	componentDidUpdate = (prevProps: IBigFormProps) => {
		// update header props
		this.headerProps = this.getHeaderProps()

		// jump to a slide if current slide has changed OR if we enabledOneSprucebot
		if (
			prevProps.currentSlide !== this.props.currentSlide ||
			prevProps.useOneSprucebot !== this.props.useOneSprucebot
		) {
			this.jumpToSlide(this.props.currentSlide || 0)
		}
	}

	public getHeaderProps = () => {
		const headers: IBigFormSlideHeaderProps[] = []

		React.Children.forEach(this.props.children, child => {
			if (child && (child as ReactElement).type === BigFormSlide) {
				React.Children.forEach(
					(child as ReactElement).props.children,
					child => {
						if (child && (child as ReactElement).type === BigFormSlideHeader) {
							headers.push((child as ReactElement).props)
						}
					}
				)
			}
		})

		return headers
	}

	public jumpToSlide = async (destinationSlide: number) => {
		this.bigFormRef.current &&
			this.bigFormRef.current.classList.add('transitioning')

		setTimeout(async () => {
			this.slideRefs.forEach((slideRef, idx) => {
				if (idx === destinationSlide) {
					slideRef.focus({ preventScroll: true })
				} else {
					slideRef.blur()
				}
			})

			if (this.props.useOneSprucebot) {
				const destinationHeaderProps = this.headerProps[destinationSlide]
				if (destinationHeaderProps && this.theOneSprucebotRef.current) {
					await this.theOneSprucebotRef.current.pause()
					await this.theOneSprucebotRef.current.addToTypingQueue({
						words: destinationHeaderProps.question
					})

					this.theOneSprucebotRef.current.play()
				}
			}

			// give styles a chance to position everything before changing the current index
			this.setState({ currentSlide: destinationSlide }, () => {
				// let all css transitions finish (1 second max)
				setTimeout(() => {
					this.bigFormRef.current &&
						this.bigFormRef.current.classList.remove('transitioning')
				}, 1000)
			})
		}, 50)
	}

	public handleSubmitSlide = () => {
		this.props.onNext && this.props.onNext()
	}

	public render(): React.ReactElement {
		const {
			children: childrenProps,
			canGoBack,
			canGoNext,
			onBack,
			onNext,
			transitionStyle,
			useOneSprucebot
		} = this.props

		const { currentSlide } = this.state

		const children = React.Children.map(childrenProps, (child, idx) => {
			if (child && (child as ReactElement).type === BigFormSlide) {
				let position = BigFormSlidePosition.Present
				if (idx < currentSlide) {
					position = BigFormSlidePosition.Past
				} else if (idx > currentSlide) {
					position = BigFormSlidePosition.Future
				}

				const slideElement = child as ReactElement
				let children = slideElement.props.children

				// if we are using one sprucebot, filter out all header fields
				if (useOneSprucebot) {
					children = []
					React.Children.forEach(slideElement.props.children, child => {
						if (!child || (child as ReactElement).type !== BigFormSlideHeader) {
							children.push(child)
						}
					})
				}

				return React.cloneElement(slideElement, {
					onSubmit: this.handleSubmitSlide,
					children,
					position,
					ref: (ref: BigFormSlide) => (this.slideRefs[idx] = ref)
				})
			}
			return child
		})

		return (
			<div
				className={cx('big-form', transitionStyle, {
					'one-sprucebot': useOneSprucebot
				})}
				ref={this.bigFormRef}
			>
				{children}
				{useOneSprucebot && (
					<div className="the-one-sprucebot">
						<SprucebotTypedMessage
							startDelayMs={0}
							ref={this.theOneSprucebotRef}
							id="the-one-sprucebot"
							paused={true}
							size={IHWSprucebotTypedMessageSize.Medium}
							defaultAvatar={{
								id: 'the-one-default',
								stateOfMind: IHWSprucebotAvatarStateOfMind.Chill
							}}
							sentences={[]}
						/>
					</div>
				)}
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
