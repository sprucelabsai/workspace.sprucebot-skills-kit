// @flow
import React from 'react'
import StarIcon from '../../../../../static/assets/icons/Social-Medias-Rewards-Rating/Rating/rating-star-1.svg'

const Stars = () => {
	return (
		<div className="stars">
			<label className="star-input__wrapper">
				<input className="star-input" type="radio" name="stars" value="1" />
				<StarIcon className="star" />
			</label>
			<label className="star-input__wrapper">
				<input className="star-input" type="radio" name="stars" value="2" />
				<StarIcon className="star" />
				<StarIcon className="star" />
			</label>
			<label className="star-input__wrapper">
				<input className="star-input" type="radio" name="stars" value="3" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
			</label>
			<label className="star-input__wrapper">
				<input className="star-input" type="radio" name="stars" value="4" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
			</label>
			<label className="star-input__wrapper">
				<input className="star-input" type="radio" name="stars" value="5" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
				<StarIcon className="star" />
			</label>
		</div>
	)
}

export default Stars
