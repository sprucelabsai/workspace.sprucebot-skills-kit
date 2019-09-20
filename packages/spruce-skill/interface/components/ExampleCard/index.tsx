import React, { Component } from 'react'
import { Card } from '@sprucelabs/react-heartwood-components'

interface IExampleCardProps {
	title: string
	text: string
}

export default class ExampleCard extends Component<IExampleCardProps> {
	public render(): React.ReactElement {
		const { title /* text */ } = this.props
		return (
			<div style={{ margin: '2rem', width: '20rem' }}>
				<Card>
					<Card.Header title={title} />
					<Card.Body isFullBleed={false}>
						{/* TODO: JSX element type 'Text' does not have any construct or call signatures. */}
						{/* <Text>{text}</Text> */}
					</Card.Body>
				</Card>
			</div>
		)
	}
}
