import React from 'react'

const SplitButton = (props: { defaultAction: string }): React.ReactNode => {
	return <div className="split-button">{props.defaultAction}</div>
}

export default SplitButton
