// @flow
import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'

import Icon from '../Icon/Icon'
import List from '../List/List'
import { InputInner } from '../Forms/FormPartials'
import Button from '../Button/Button'

import type { Props as ListProps } from '../List/List'

type Props = {
	/** The list of initial results to show when search is displayed */
	initialSearchResults?: Array<ListProps>,

	/** The search results to display as the user is entering search query */
	suggestedSearchResults?: Array<ListProps>,

	/** Whether search is visible */
	isVisible: boolean
}

type State = {
	isAddGuestShowing: boolean,
	searchValue: string,
	searchContextBarIsHighlighted: boolean
}

export default class BigSearch extends Component<Props, State> {
	static defaultProps = {
		isVisible: false
	}

	state = {
		isAddGuestShowing: false,
		searchValue: '',
		searchContextBarIsHighlighted: false
	}

	renderSearchResults = (results: ListProps) => {
		return <List isSmall={true} {...results} />
	}

	handleSearchValueChange = (e: any) => {
		const searchValue = e.target.value
		this.setState({
			searchValue,
			searchContextBarIsHighlighted: searchValue !== ''
		})
	}

	handleClearSearchValue = () => {
		this.setState({ searchValue: '' })
	}

	render() {
		const {
			isAddGuestShowing,
			searchValue,
			searchContextBarIsHighlighted
		} = this.state

		const {
			initialSearchResults,
			suggestedSearchResults,
			isVisible
		} = this.props

		return (
			<CSSTransition
				in={isVisible}
				appear={true}
				classNames="big-search-overlay"
				timeout={100}
			>
				<div
					className={cx('big-search-overlay', {
						'big-search-overlay--visible': isVisible
					})}
				>
					<div className="big-search">
						<div className="big-search__search-view-header">
							<div className="big-search__search-view-search-bar">
								<div className={'text-input'}>
									<div class="text-input__inner">
										<Icon icon={'search'} className="text-input__icon-pre" />
										<input
											class="text-input__input"
											placeholder="CHANGE ME"
											value={searchValue}
											onChange={this.handleSearchValueChange}
										/>
									</div>
								</div>
								<div className="big-search__search-view-search-bar-buttons">
									<Button text="Clear" onClick={this.handleClearSearchValue} />
									<Button icon={{ name: 'close' }} />
								</div>
							</div>
							{!searchValue ? (
								<Button
									className="big-search__search-view-add-btn"
									text="Quick add a new guest"
									icon={{ name: 'add' }}
								/>
							) : (
								<Button
									className={cx('big-search__search-view-context-bar-btn', {
										'big-search__search-view-context-bar-btn--highlighted': searchContextBarIsHighlighted
									})}
									text={searchValue}
									icon={{ name: 'search' }}
								/>
							)}
						</div>
						<div className="big-search__view-body">
							{searchValue === '' &&
								initialSearchResults &&
								initialSearchResults.map(this.renderSearchResults)}
							{searchValue !== '' &&
								suggestedSearchResults &&
								suggestedSearchResults.map(this.renderSearchResults)}
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
}
