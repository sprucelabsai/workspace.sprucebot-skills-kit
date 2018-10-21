import React from 'react'
import App, { Container } from 'next/app'

if (typeof window !== 'undefined') {
	global.log = require('@sprucelabs/log')
}

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	componentDidMount() {
		const {
			PACKAGE_VERSION,
			PACKAGE_NAME,
			LOG_LEVEL,
			SLUG,
			ENV,
			METRICS_URL,
			METRICS_ENABLED
		} = this.props.pageProps.initialState.config

		global.log.setOptions({
			level: LOG_LEVEL,
			appName: SLUG,
			appEnv: ENV,
			userAgent:
				navigator && navigator.userAgent ? navigator.userAgent : 'unknown',
			packageVersion: PACKAGE_VERSION,
			packageName: PACKAGE_NAME,
			metricsUrl: METRICS_URL,
			metricsEnabled: METRICS_ENABLED
		})
	}

	componentDidCatch(error, info) {
		log.crit({ error, info })
		log.metric('componentDidCatch')
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Container>
				<Component {...pageProps} />
			</Container>
		)
	}
}
