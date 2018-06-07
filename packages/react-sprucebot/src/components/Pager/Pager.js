import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ControlButton from '../ControlButton/ControlButton'

const StyledList = styled.ul`
	display: flex;
	align-items: center;
`

const DropDownButton = styled(ControlButton)`
	margin-left: 0.7em;
`

class Pager extends Component {
	// Starting page
	state = {
		page: this.props.page
	}

	componentDidUpdate = prevProps => {
		const { updatePage, backToStart } = prevProps

		if (updatePage) {
			this.updatePageNumber()
		}

		if (backToStart) {
			this.backToStart()
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
		const { skipAmount } = this.props

		this.setState(prevState => {
			if (skipAmount && prevState.page - skipAmount > 0) {
				return {
					page: this.triggerOnChange(prevState.page - skipAmount, e)
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
		this.setState(prevState => {
			if (prevState.page > 0) {
				return {
					page: this.triggerOnChange(prevState.page - 1, e)
				}
			}
			return {}
		})
	}

	next = e => {
		const { totalPages } = this.props

		this.setState(prevState => {
			if (prevState.page < totalPages - 1) {
				return {
					page: this.triggerOnChange(prevState.page + 1, e)
				}
			}
			return {}
		})
	}

	last = e => {
		const { totalPages, skipAmount } = this.props

		this.setState(prevState => {
			if (skipAmount && prevState.page + skipAmount < totalPages - 1) {
				return {
					page: this.triggerOnChange(prevState.page + skipAmount, e)
				}
			} else if (prevState.page < totalPages - 1) {
				return {
					page: this.triggerOnChange(totalPages - 1, e)
				}
			}
			return {}
		})
	}

	updatePageNumber = e => {
		const { updateAmount } = this.props

		if (updateAmount) {
			this.setState(prevState => {
				return {
					page: this.triggerOnChange(prevState.page + updateAmount, e)
				}
			})
		}
	}

	backToStart = e => {
		const { initialPage } = this.props

		if (initialPage) {
			this.setState({ page: this.triggerOnChange(initialPage, e) })
		}
	}

	render() {
		const { page } = this.state
		const {
			totalPages,
			titles,
			hasButton,
			buttonClick,
			smallArrows
		} = this.props

		const first = page === 0
		const last = page === totalPages - 1

		const title = titles ? titles(page) : `${page + 1} of ${totalPages}`

		const smallArrowStyle = smallArrows && {
			flex: 0.5
		}

		return (
			<StyledList className="pager">
				<li
					className={`first ${first && 'disabled'}`}
					onClick={this.first}
					style={smallArrowStyle}
				>
					<a>First</a>
				</li>
				<li
					className={`back ${first && 'disabled'}`}
					onClick={this.back}
					style={smallArrowStyle}
				>
					<a>Back</a>
				</li>
				<li className="current">
					{hasButton && buttonClick ? (
						<DropDownButton iconRight={hasButton} onClick={buttonClick}>
							{title}
						</DropDownButton>
					) : (
						title
					)}
				</li>
				<li
					className={`next ${last && 'disabled'}`}
					onClick={this.next}
					style={smallArrowStyle}
				>
					<a>Next</a>
				</li>
				<li
					className={`last ${last && 'disabled'}`}
					onClick={this.last}
					style={smallArrowStyle}
				>
					<a>Last</a>
				</li>
			</StyledList>
		)
	}
}

export default Pager

Pager.propTypes = {
	page: PropTypes.number,
	totalPages: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	titles: PropTypes.func
}

Pager.defaultProps = {
	page: 0
}
