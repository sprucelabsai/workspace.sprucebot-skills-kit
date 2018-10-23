// @flow
import React from 'react'

type PanelProps = {
	id: string,
	label: string,
	value: string
}

const ScorePanel = (props: PanelProps) => {
	const { label, value } = props
	return (
		<div className="card__score">
			<p className="card__score-label">{label}</p>
			<p className="card__score-value">{value}</p>
		</div>
	)
}

type Props = {
	scores: Array<PanelProps>
}

const Scores = (props: Props) => {
	const { scores } = props
	return (
		<div className="card__scores">
			{scores.map(score => (
				<ScorePanel key={score.id} {...score} />
			))}
		</div>
	)
}

export default Scores
