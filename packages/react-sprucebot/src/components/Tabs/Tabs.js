// @flow
// TODO: Figure out how to split tabs up based on what's visible in the viewport
import React from 'react'
import Tab, { Props as TabProps } from './components/Tab/Tab'
import ContextMenu from '../ContextMenu/ContextMenu'

type Props = {
	tabs: Array<TabProps>
}

const Tabs = (props: props) => {
	const { tabs } = props
	return (
		<ul className="tab-group">
			{tabs.map(tab => (
				<Tab key={tab.text} {...tab} />
			))}
			<li className="tab">
				<ContextMenu
					actions={[
						{
							text: 'Edit'
						}
					]}
				/>
			</li>
		</ul>
	)
}

export default Tabs
