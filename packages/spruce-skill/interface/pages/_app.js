import React from 'react'
import App, { Container } from 'next/app'
import config from 'config'
global.log = require('@sprucelabs/log/client')

// Set up log options
global.log.setOptions({
	level: config.LOG_LEVEL,
	appName: config.SLUG,
	appEnv: config.ENV,
	userAgent:
		typeof navigator !== 'undefined' && navigator.userAgent
			? navigator.userAgent
			: 'unknown',
	packageVersion: config.PACKAGE_VERSION,
	packageName: config.PACKAGE_NAME,
	metricsUrl: config.METRICS_URL,
	metricsEnabled: config.METRICS_ENABLED
})

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
			METRICS_ENABLED,
			METRICS_BROWSER_STATS_ENABLED
		} = this.props.pageProps.initialState.config

		if (METRICS_ENABLED && METRICS_BROWSER_STATS_ENABLED) {
			// We need to wait to ensure that "loadTime" has been set
			setTimeout(() => {
				log.collectBrowserMetrics()
				log.debug('Browser Page Load Metrics Collected:', log.times())
			}, 1000)
		}
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
