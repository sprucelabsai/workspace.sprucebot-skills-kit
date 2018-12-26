// @flow
import React, { Component } from 'react'
import FontFaceObserver from 'fontfaceobserver'
import Helmet from 'react-helmet'
import { number } from '@storybook/addon-knobs/dist/deprecated'

type Font = {
	name: string,
	weight: string | number,
	style?: string
}

type LoadResult = {
	name: string,
	loaded: boolean
}

type Props = {
	/** Fonts that need to be loaded */
	fonts: Array<string>
}
type State = {
	/** Results of font loading attempts */
	results: Array<LoadResult>
}

export default class FontLoader extends Component<Props, State> {
	state = {
		results: []
	}

	async componentDidMount() {
		const { fonts } = this.props
		const fontsToObserve = []

		if (typeof document !== 'undefined') {
			document.body.classList.add('fonts-loading')
		}

		fonts.forEach(font => {
			// Define each font to load
			const { name, weight, style } = font
			const fontToObserve = new FontFaceObserver(name, {
				weight,
				style
			})

			// Add font to array
			fontsToObserve.push(fontToObserve.load())
		})

		// Load all the fonts
		Promise.all(fontsToObserve)
			.then(fonts => {
				if (typeof log !== 'undefined') {
					log.info('Fonts loaded: ', fonts)
				} else {
					console.log('Fonts loaded: ', fonts)
				}
			})
			.catch(err => {
				if (typeof log !== 'undefined') {
					log.warn(err)
				} else {
					console.error(err)
				}
			})
			.finally(() => {
				// Show me the fonts!
				if (typeof document !== 'undefined') {
					document.body.classList.remove('fonts-loading')
					document.body.classList.add('fonts-loaded')
				}
			})
	}

	render() {
		const { fonts } = this.props

		if (fonts.some(font => font.link)) {
			return (
				<Helmet>
					{fonts.map(font => (
						<link key={font.link.href} {...font.link} />
					))}
				</Helmet>
			)
		}
		return null
	}
}
