import React, { ReactElement } from 'react'
import BigFormSlide, { BigFormSlidePosition } from './components/BigFormSlide'
import BigFormSlideBody from './components/BigFormSlideBody'
import BigFormSlideHeader from './components/BigFormSlideHeader'
import BigFormControls from './components/BigFormControls'

interface IBigFormProps {
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

interface IBigFormState {
	/** for tracking viewport width */
	viewportWidth: number
	/** for tracking viewport height */
	viewportHeight: number
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
		canGoNext: false
	}

	/** the scroll frame for scrolling left/right */
	bigFormRef = React.createRef<HTMLDivElement>()
	scrollRef = React.createRef<HTMLDivElement>()
	slideRefs: BigFormSlide[] = []

	constructor(props: IBigFormProps) {
		super(props)

		this.state = {
			viewportWidth: 0,
			viewportHeight: 0
		}
	}

	public componentDidMount = () => {
		this.handleResize()
		this.updateSlideFocus()

		window.addEventListener('resize', this.handleResize)
		window.addEventListener('resized', this.handleResize)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.handleResize)
		window.removeEventListener('resized', this.handleResize)
	}

	componentDidUpdate = (prevProps: IBigFormProps) => {
		if (prevProps.currentSlide !== this.props.currentSlide) {
			this.updateSlidePosition()
			this.updateSlideFocus()
		}
	}

	public handleResize = async () => {
		await this.updateViewPortSize()
		this.updateSlideSize()
		this.updateSlidePosition()
	}

	public updateViewPortSize = async () => {
		const d = document,
			root = d.documentElement,
			body = d.body

		const width = window.innerWidth || root.clientWidth || body.clientWidth
		const height = window.innerHeight || root.clientHeight || body.clientHeight

		return new Promise(resolve => {
			this.setState({ viewportWidth: width, viewportHeight: height }, resolve)
		})
	}

	public updateSlidePosition = () => {
		const { viewportWidth } = this.state
		const { currentSlide = 0 } = this.props

		const left = viewportWidth * currentSlide

		if (this.scrollRef.current) {
			this.scrollRef.current.style.transform = `translate(-${left}px)`
		}
	}

	public updateSlideSize = () => {
		const { viewportWidth } = this.state
		if (this.bigFormRef.current) {
			this.bigFormRef.current
				.querySelectorAll<HTMLDivElement>('.slide')
				.forEach(slide => {
					slide.style.width = `${viewportWidth}px`
				})
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
			onNext
		} = this.props

		const { viewportWidth } = this.state

		let totalSlides = 0

		const children = React.Children.map(childrenProps, (child, idx) => {
			if (
				child &&
				(child as ReactElement).type &&
				(child as ReactElement).type === BigFormSlide
			) {
				totalSlides++
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
			<div className={'big-form'} ref={this.bigFormRef}>
				<div
					className={'scroll-frame'}
					style={{ width: `${totalSlides * viewportWidth}px` }}
					ref={this.scrollRef}
				>
					{children}
				</div>
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
