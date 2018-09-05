import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ControlButton from '../ControlButton/ControlButton'
import Loader from '../Loader/Loader'
import IconButton from '../IconButton/IconButton'

const StyledList = styled.ul`
	display: flex;
	align-items: center;
	${props => props.margin && `margin: ${props.margin}`};
`

const StyledListItem = styled.li`
	&& {
		${props => props.smallArrows && `flex: 0.5`};
		${props => props.hide && `display: none`};
		${props =>
			props.loading &&
			`
				pointer-events: none;
				cursor: not-allowed;
			`};
	}
`

const DropDownButton = styled(ControlButton)`
	margin-left: 0.7em;
`

const StyledLoader = styled(Loader)`
	&& {
		flex: 2;
		display: flex;
		align-self: center;
		align-items: center;
		justify-content: center;
	}
`

class Pager extends Component {
	// Starting page
	state = {
		page: this.props.page
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.page !== this.props.page) {
			this.setState({ page })
		}
	}

	triggerOnChange = (page, e) => {
		const { onChange } = this.props

		if (onChange) {
			onChange(page, e)
		}
		return page
	}

	first = e => {
		const { jumpAmount, infinite } = this.props

		this.setState(prevState => {
			if (infinite || (jumpAmount && prevState.page - jumpAmount > 0)) {
				return {
					page: this.triggerOnChange(prevState.page - jumpAmount, e)
				}
			} else if (prevState.page > 0) {
				return {
					page: this.triggerOnChange(0, e)
				}
			}
			return {}
		})
	}

	back = e => {
		const { infinite, skipAmount = 1 } = this.props

		this.setState(prevState => {
			if (infinite || prevState.page - skipAmount >= 0) {
				return {
					page: this.triggerOnChange(prevState.page - skipAmount, e)
				}
			}
			return {}
		})
	}

	next = e => {
		const { totalPages, infinite, skipAmount = 1 } = this.props

		this.setState(prevState => {
			if (infinite || prevState.page < totalPages - skipAmount) {
				return {
					page: this.triggerOnChange(prevState.page + skipAmount, e)
				}
			}
			return {}
		})
	}

	last = e => {
		const { totalPages, jumpAmount, infinite } = this.props

		this.setState(prevState => {
			if (
				infinite ||
				(jumpAmount && prevState.page + jumpAmount < totalPages - 1)
			) {
				return {
					page: this.triggerOnChange(prevState.page + jumpAmount, e)
				}
			} else if (prevState.page < totalPages - 1) {
				return {
					page: this.triggerOnChange(totalPages - 1, e)
				}
			}
			return {}
		})
	}

	renderView = () => {
		const { page } = this.state
		const { totalPages, titles } = this.props

		const title = titles ? titles(page) : `${page + 1} of ${totalPages}`
		return <StyledListItem className="current">{title}</StyledListItem>
	}

	render() {
		const { page } = this.state
		const {
			totalPages,
			showStep,
			showJump,
			infinite,
			className,
			...props
		} = this.props

		const first = page === 0 && !infinite
		const last = page === totalPages - 1 && !infinite

		return (
			<ul {...props} className={`${className} pager`}>
				{showJump && (
					<li className={`first ${first && 'disabled'}`} smallArrows>
						<IconButton onClick={this.first}>first_page</IconButton>
					</li>
				)}
				{showStep && (
					<li className={`back ${first && 'disabled'}`} smallArrows>
						<IconButton onClick={this.back}>chevron_left</IconButton>
					</li>
				)}

				{this.renderView()}

				{showStep && (
					<li className={`next ${last && 'disabled'}`} smallArrows>
						<IconButton onClick={this.next}>chevron_right</IconButton>
					</li>
				)}
				{showJump && (
					<li className={`last ${last && 'disabled'}`} smallArrows>
						<IconButton onClick={this.last}>last_page</IconButton>
					</li>
				)}
			</ul>
		)
	}
}

export default Pager

Pager.propTypes = {
	page: PropTypes.number,
	totalPages: PropTypes.number,
	infinite: PropTypes.bool,
	onChange: PropTypes.func,
	titles: PropTypes.func,
	stepAmount: PropTypes.number,
	jumpAmount: PropTypes.number
}

Pager.defaultProps = {
	page: 0,
	infinite: false,
	stepAmount: 1,
	showStep: true,
	showJump: true
}
