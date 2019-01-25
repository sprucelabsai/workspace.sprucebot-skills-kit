// @flow
import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import cx from 'classnames'
import { CSSTransition } from 'react-transition-group'

import Icon from '../../../Icon/Icon'
import List from '../../../List/List'
import Tabs from '../../../Tabs/Tabs'
import { InputInner } from '../../../Forms/FormPartials'
import Button from '../../../Button/Button'

import type { Props as TabProps } from '../../../Tabs/Tabs'
import type { Props as ListProps } from '../../../List/List'
import type { Props as ListItemProps } from '../../../List'

type Props = {
	/** The placeholder displayed in search bar */
	searchPlaceholder?: string,

	/** The list of initial results to show when search is displayed */
	initialSearchResults?: Array<ListProps>,

	/** The tabbed search results for a submitted query */
	searchResults?:
		| ListProps
		| Array<{ text: string, items: Array<ListItemProps> }>,

	/** Whether search is visible */
	isVisible: boolean,

	/** Get search suggestions as search value changes */
	getSearchSuggestions: (value: string) => Promise<Array<ListProps>>,

	/** Handle search submit */
	onSearchSubmit?: (value: string) => void,

	/** Handle close button click */
	onClose?: () => void
}

type State = {
	isAddButtonVisible: boolean,
	searchValue: string,
	searchContextBarIsHighlighted: boolean,
	activeSearchResultsTabIndex: number,
	suggestedSearchResults: Array<ListProps>
}

export default class BigSearch extends Component<Props, State> {
	static defaultProps = {
		isVisible: false
	}

	state = {
		isAddButtonVisible: false,
		searchValue: '',
		searchContextBarIsHighlighted: false,
		activeSearchResultsTabIndex: 0,
		suggestedSearchResults: []
	}

	bigSearchRef: any = React.createRef()
	searchInputRef: any = React.createRef()

	componentDidMount = () => {
		this.searchInputRef && this.searchInputRef.current.focus()
	}

	handleSearchValueChange = async (e: any) => {
		const searchValue = e.target.value
		this.setState({
			searchValue,
			searchContextBarIsHighlighted: searchValue !== ''
		})
		try {
			const suggestedSearchResults = await this.props.getSearchSuggestions(
				searchValue
			)
			this.setState({ suggestedSearchResults: suggestedSearchResults })
		} catch (err) {
			console.log(err)
		}
	}

	handleSearchSubmit = () => {
		const searchValue = this.state.searchValue
		this.props.onSearchSubmit && this.props.onSearchSubmit(searchValue)
	}

	handleClearSearchValue = () => {
		this.setState({ searchValue: '' })
	}

	handleClickCloseSearch = () => {
		this.props.onClose && this.props.onClose()
	}

	handleClickOverlay = (e: any) => {
		if (
			this.bigSearchRef.current &&
			e.target.contains(this.bigSearchRef.current)
		) {
			this.props.onClose && this.props.onClose()
		}
	}

	handleTabClick = (idx: number) => {
		this.setState({ activeSearchResultsTabIndex: idx })
	}

	renderSearchResultsList = (results: ListProps) => {
		return <List isSmall={true} {...results} />
	}

	renderTabbedSearchResults = (results: Array<TabProps>) => {
		const { activeSearchResultsTabIndex } = this.state
		return (
			<Tabs
				tabs={results.map<{ text: string, items: Array<ListItemProps> }>(
					(result, idx) => {
						const { text, items } = result
						return {
							text: text,
							isCurrent: idx === activeSearchResultsTabIndex,
							panel: <List isSmall={true} items={items} />,
							onClick: () => this.handleTabClick(idx),
							...result
						}
					}
				)}
			/>
		)
	}

	renderSearchResults = () => {
		const { searchValue, suggestedSearchResults } = this.state
		const { initialSearchResults, searchResults } = this.props

		if (
			initialSearchResults &&
			suggestedSearchResults.length === 0 &&
			!searchResults
		) {
			return initialSearchResults.map<ListProps>(this.renderSearchResultsList)
		} else if (suggestedSearchResults.length > 0 && !searchResults) {
			return suggestedSearchResults.map<ListProps>(this.renderSearchResultsList)
		} else if (searchResults) {
			return Array.isArray(searchResults)
				? this.renderTabbedSearchResults(searchResults)
				: this.renderSearchResultsList(searchResults)
		}
	}

	renderSearchContextButton = () => {
		const {
			searchValue,
			searchContextBarIsHighlighted,
			suggestedSearchResults
		} = this.state
		const { isVisible, searchResults } = this.props

		if (suggestedSearchResults.length === 0 && !searchResults) {
			return (
				<Button
					className="big-search__search-view-add-btn"
					text="Quick add a new guest"
					icon={{ name: 'add' }}
				/>
			)
		} else if (searchValue && !searchResults) {
			return (
				<Button
					className={cx('big-search__search-view-context-bar-btn', {
						'big-search__search-view-context-bar-btn--highlighted': searchContextBarIsHighlighted
					})}
					text={searchValue}
					icon={{ name: 'search' }}
				/>
			)
		}
	}

	render() {
		const {
			isAddButtonVisible,
			searchValue,
			searchContextBarIsHighlighted
		} = this.state

		const { isVisible, searchPlaceholder } = this.props

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
					onClick={this.handleClickOverlay}
				>
					<div className="big-search" ref={this.bigSearchRef}>
						<div className="big-search__search-view-header">
							<div className="big-search__search-view-search-bar">
								<div className={'text-input'}>
									<div className="text-input__inner">
										<Icon icon={'search'} className="text-input__icon-pre" />
										<input
											ref={this.searchInputRef}
											className="text-input__input"
											placeholder={searchPlaceholder || 'Search'}
											value={searchValue}
											onChange={this.handleSearchValueChange}
										/>
									</div>
								</div>
								<div className="big-search__search-view-search-bar-buttons">
									<Button text="Clear" onClick={this.handleClearSearchValue} />
									<Button
										icon={{ name: 'close' }}
										onClick={this.handleClickCloseSearch}
									/>
								</div>
							</div>
							{this.renderSearchContextButton()}
						</div>
						<div className="big-search__view-body">
							{this.renderSearchResults()}
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
}
