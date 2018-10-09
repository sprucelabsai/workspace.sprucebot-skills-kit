// @flow
// TODO: Figure out how to split tabs up based on what's visible in the viewport
import React, { Fragment } from 'react'
import Tab, { Props as TabProps } from './components/Tab/Tab'
import ContextMenu from '../ContextMenu/ContextMenu'

type Props = {
	tabs: Array<TabProps>
}

const Tabs = (props: props) => {
	const { tabs } = props
	const hiddenTabs = []
	const activeTab = tabs.find(tab => tab.isCurrent)
	console.log({ activeTab })
	// TODO: Determine how hidden tabs work
	return (
		<Fragment>
			<ul className="tab-group">
				{tabs.map(tab => {
					console.log({ tab })
					return <Tab key={tab.text} {...tab} />
				})}
				{hiddenTabs &&
					hiddenTabs.length > 0 && (
						<li className="tab">
							<ContextMenu
								actions={[
									{
										text: 'Edit'
									}
								]}
							/>
						</li>
					)}
			</ul>
			{activeTab && activeTab.panel}
		</Fragment>
	)
}

export default Tabs
