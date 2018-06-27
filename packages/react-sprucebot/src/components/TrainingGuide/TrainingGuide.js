import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import BotText from '../BotText/BotText'
import skill from '../../skillskit/index'

// what is the correct way to add functionality like this?
function height(elm) {
	var elmHeight, elmMargin

	if (document.all) {
		// IE
		elmHeight = elm.currentStyle.height
		elmMargin =
			parseInt(elm.currentStyle.marginTop, 10) +
			parseInt(elm.currentStyle.marginBottom, 10)
	} else {
		// Mozilla
		elmHeight = parseInt(
			document.defaultView.getComputedStyle(elm, '').getPropertyValue('height'),
			10
		)
		elmMargin =
			parseInt(
				document.defaultView
					.getComputedStyle(elm, '')
					.getPropertyValue('margin-top'),
				10
			) +
			parseInt(
				document.defaultView
					.getComputedStyle(elm, '')
					.getPropertyValue('margin-bottom'),
				10
			)
	}
	return elmHeight + elmMargin
}

export default class TrainingGuide extends Component {
	constructor(props) {
		super(props)

		// every steps' dom node so we can calc heights
		this.stepDomNodes = []

		this.state = {
			currentStep: 0,
			stepHeights: props.steps.map(() => 0),
			stepWidths: props.steps.map(() => 0),
			transitioning: false
		}
	}

	next() {
		this.setState((prevState, props) => {
			if (prevState.currentStep < props.steps.length - 1) {
				return {
					currentStep: prevState.currentStep + 1
				}
			}
			return {}
		})
	}

	componentDidUpdate(prevProps, prevState) {
		// Scroll to next/done buttons if the current step has changed
		if (this.state.currentStep !== prevState.currentStep) {
			this.setState({ transitioning: true })

			// todo , don't scroll UP, only down (need to postMessage to get scroll (see Dialog))
			setTimeout(() => {
				skill.scrollTo(
					ReactDOM.findDOMNode(this.button).offsetTop -
						window.screen.height * 0.5
				)
				this.setState({ transitioning: false })
			}, 1500)
		}
	}

	componentDidMount() {
		const { steps, onboardingComplete } = this.props
		const { currentStep } = this.state
		// calculate height of first element in each step
		const stepHeights = this.stepDomNodes.map(node => {
			const first = node.children[0]
			return height(first)
		})

		// also set div widths so text doesn't wrap weird on animations
		const stepWidths = this.stepDomNodes.map(node => {
			const span = node.children[0].children[0]
			return span.offsetWidth
		})

		this.setState({
			stepHeights,
			stepWidths,
			currentStep: onboardingComplete ? steps.length - 1 : currentStep
		})
	}

	onComplete() {
		this.setState({ transitioning: true }) // just show progress until done
		this.props.onComplete()
	}

	render() {
		const {
			steps,
			nextButtonLabel,
			doneButtonLabel,
			onboardingComplete
		} = this.props
		const { currentStep, stepHeights, stepWidths, transitioning } = this.state
		const last = currentStep === steps.length - 1

		return (
			<div className="training_guide">
				{steps.map((step, idx) => {
					const stepStyle = stepWidths[idx] ? { width: stepWidths[idx] } : {}
					return (
						<div
							className={`training_guide__step ${
								idx <= currentStep ? 'on' : 'off'
							} ${idx === 0 ? 'first' : ''}`}
							style={{
								height: idx <= currentStep ? stepHeights[idx] : 0
							}}
							ref={node => (this.stepDomNodes[idx] = node)}
							key={`step-${idx}`}
						>
							<BotText>
								<span style={stepStyle}>{step}</span>
							</BotText>
						</div>
					)
				})}
				<div>
					{!last && (
						<Button
							alt
							busy={transitioning}
							ref={ref => {
								this.button = ref
							}}
							onClick={() => {
								if (!transitioning) this.next()
							}}
						>
							{nextButtonLabel}
						</Button>
					)}

					{last && (
						<Button
							primary
							busy={transitioning}
							ref={ref => {
								this.button = ref
							}}
							onClick={() => {
								if (!transitioning) this.onComplete()
							}}
						>
							{doneButtonLabel}
						</Button>
					)}
				</div>
			</div>
		)
	}
}

TrainingGuide.propTypes = {
	steps: PropTypes.array.isRequired,
	nextButtonLabel: PropTypes.string.isRequired,
	doneButtonLabel: PropTypes.string.isRequired,
	onComplete: PropTypes.func.isRequired,
	onboardingComplete: PropTypes.bool.isRequired
}

TrainingGuide.defaultProps = {
	nextButtonLabel: 'Next',
	doneButtonLabel: 'Done',
	onboardingComplete: false
}
