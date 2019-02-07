// @flow
// TODO: Figure out how to split tabs up based on what's visible in the viewport
import React, { Component, Fragment } from 'react'
import debounce from 'lodash/debounce'
import cx from 'classnames'
import Tab from './components/Tab/Tab'
import type { Props as TabProps } from './components/Tab/Tab'
import ContextMenu from '../ContextMenu/ContextMenu'

export type Props = {
	/** The tabs for this group */
	tabs: Array<TabProps>,

	/** Adds horizontal Padding */
	isPadded?: boolean,

	/** Set false to prevent truncation behavior */
	isTruncatable?: boolean,

	/** Optional class to add to the tab group */
	className?: string
}

//TODO properly define State type

const getActiveTabIndex = (tabs: Array<TabProps>) => {
	const activeTabIndex = tabs.findIndex(tab => tab.isCurrent)
	return activeTabIndex
}

export default class Tabs extends Component<Props> {
	state = {
		activeTabIndex: getActiveTabIndex(this.props.tabs),
		hiddenTabIndices: [],
		tabWidths: [],
		disclosureTabWidth: [],
		isContextTabVisible: true
	}

	static defaultProps = {
		isPadded: true,
		isTruncatable: true,
		className: ''
	}

	tabGroup: any
	contextTab: any

	debouncedResize = debounce(() => this.handleWindowResize(), 500)

	componentDidMount() {
		const { isTruncatable } = this.props

		if (isTruncatable) {
			this.handleInitialMeasurement()
			if (typeof window !== 'undefined') {
				window.addEventListener('resize', this.debouncedResize, false)
			}
		}
	}

	componentWillUnmount() {
		const { isTruncatable } = this.props

		if (isTruncatable) {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', this.debouncedResize, false)
			}
		}
	}

	handleWindowResize = () => {
		this.handleMeasurement()
	}

	handleInitialMeasurement = () => {
		// Purpose: get the initial measurements for child tabs
		const wrapper = this.tabGroup
		const wrapperWidth = wrapper.offsetWidth
		const contextTabWidth = this.contextTab.offsetWidth
		const children = wrapper.childNodes
		const childrenArray = Array.prototype.slice.call(children)
		const tabWidths = []
		childrenArray.forEach(child => {
			if (!child.classList.contains('context-tab')) {
				tabWidths.push(child.offsetWidth)
			}
		})
		const totalTabsWidth = tabWidths.reduce((a, b) => a + b, 0)
		this.setState(
			{
				tabWidths,
				contextTabWidth,
				isContextTabVisible: totalTabsWidth > wrapperWidth
			},
			() => this.handleMeasurement()
		)
	}

	handleMeasurement = () => {
		// TODO: Make this fire when sidebars change
		const wrapper = this.tabGroup
		const wrapperWidth = wrapper.offsetWidth
		const contextTabWidth = this.contextTab.offsetWidth
		const { tabs } = this.props
		const { tabWidths, activeTabIndex } = this.state
		const totalTabsWidth = tabWidths.reduce((a, b) => a + b, 0)
		const hiddenTabIndices = []
		let width = activeTabIndex > -1 ? tabWidths[activeTabIndex] : tabWidths[0]

		if (wrapperWidth > totalTabsWidth) {
			this.setState({
				hiddenTabIndices: [],
				isContextTabVisible: false
			})
		} else {
			tabs.forEach((tab, idx) => {
				if (width + contextTabWidth > wrapperWidth) {
					hiddenTabIndices.push(idx)
				}
				width += tabWidths[idx + 1]
			})
			this.setState({
				hiddenTabIndices,
				isContextTabVisible: true
			})
		}
	}

	render() {
		const { tabs, isPadded, isTruncatable, className } = this.props
		const { hiddenTabIndices, isContextTabVisible, activeTabIndex } = this.state
		const hiddenTabs = []
		const activeTab = tabs.find(tab => tab.isCurrent)
		if (hiddenTabIndices.length > 0) {
			hiddenTabIndices.forEach(idx => {
				if (idx !== activeTabIndex) {
					hiddenTabs.push(tabs[idx])
				}
			})
		}
		let tabsToShow = [...tabs]
		if (
			activeTabIndex > -1 &&
			hiddenTabIndices.length > 0 &&
			hiddenTabIndices.indexOf(activeTabIndex) > -1
		) {
			tabsToShow.splice(activeTabIndex, 1)
			tabsToShow = [tabs[activeTabIndex], ...tabsToShow]
		}

		return (
			<Fragment>
				<ul
					ref={ref => (this.tabGroup = ref)}
					className={cx('tab-group', className, {
						'tab-group--is-padded': isPadded,
						'tab-group--spacing-even': hiddenTabIndices.length > 0
					})}
				>
					{tabsToShow.map((tab, idx) => {
						if (hiddenTabIndices.indexOf(idx) > -1) {
							return null
						}
						return <Tab key={tab.text} {...tab} />
					})}
					{isTruncatable && (
						<li
							ref={ref => (this.contextTab = ref)}
							className={cx('tab context-tab', {
								'context-tab--is-visible': isContextTabVisible
							})}
						>
							<ContextMenu actions={hiddenTabs} closeOnSelectAction />
						</li>
					)}
				</ul>
				{activeTab && activeTab.panel}
			</Fragment>
		)
	}
}
