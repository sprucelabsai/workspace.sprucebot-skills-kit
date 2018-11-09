import React, { Component } from 'react'

import * as actions from '../store/actions'
import ServerCookies from 'cookies'
import ClientCookies from 'js-cookies'
import skill from '../index'
import DevControls from './DevControls'
import { Loader } from '@sprucelabs/react-heartwood-components'
import qs from 'qs'
import lang from '../helpers/lang'
import Router, { withRouter } from 'next/router'
import { Container } from 'next/app'
import is from 'is_js'

const debug = require('debug')('@sprucelabs/react-sprucebot')

const setCookie = (named, value, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, { secure: true })
		return cookies.set(named, value)
	} else {
		return ClientCookies.setItem(named, value)
	}
}

const getCookie = (named, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, { secure: true })
		return cookies.get(named)
	} else {
		return ClientCookies.getItem(named)
	}
}

const Page = Wrapped => {
	const ConnectedWrapped = withRouter(Wrapped)

	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				attemptingReAuth: !!props.attemptingReAuth,
				isIframed: true
			}
		}

		// Everything here is run server side
		static async getInitialProps({ pathname, query, asPath, store, res, req }) {
			let props = { pathname, query, asPath, skill }

			const jwt = query.jwt || getCookie('jwt', req, res)

			if (jwt) {
				try {
					await store.dispatch(actions.auth.go(jwt))
					await store.dispatch(actions.onboarding.didOnboarding())

					// only save cookie if a new one has been passed
					if (query.jwt) {
						setCookie('jwt', query.jwt, req, res)
					}
				} catch (err) {
					debug(err)
					debug('Error fetching user from jwt')
				}
			} else {
				debug(
					'This looks pretty bad. You are missing a jwt and will probably be unauthorized'
				)
			}

			const state = store.getState()

			if (state.auth && !state.auth.error) {
				state.auth.role =
					(state.config.DEV_MODE && getCookie('devRole', req, res)) ||
					state.auth.role
			}

			if (ConnectedWrapped.getInitialProps) {
				const args = Array.from(arguments)
				args[0] = { ...args[0], ...state }
				props = {
					...props,
					...(await ConnectedWrapped.getInitialProps.apply(this, args))
				}
			}

			let redirect = props.redirect || false

			if (
				query.back &&
				query.jwt &&
				(query.back.search('sprucebot.com') > 0 ||
					query.back.search('bshop.io') > 0)
			) {
				// if there is a jwt, we are being authed
				redirect = query.back
			} else if (
				!redirect &&
				!props.public &&
				(!state.auth || !state.auth.role || state.auth.error)
			) {
				// no redirect is set, we're not public, but auth failed
				redirect = '/unauthorized'
				debug('AUTH FAILED', state)
			} else if (!redirect && !props.public) {
				// all things look good, lets just make sure we're in the right area (owner, teammate, or guest)
				const role = state.auth.role
				const firstPart = props.pathname.split('/')[1]

				const { jwt, ...rest } = query
				const queryString = qs.stringify(rest)

				// we are at '/' then redirect to the corresponding role's path
				if (props.pathname === '/') {
					redirect = `/${role}?${queryString}`
				} else if (role !== firstPart) {
					redirect = `/unauthorized`
				}
			}

			if (redirect && res) {
				res.writeHead(302, {
					Location: redirect
				})
				res.end()
				res.finished = true
				return
			} else if (redirect) {
				window.location.href = redirect
			}

			// if we are /unauthorized, don't have a cookie, but have NOT done cookie check
			if (
				props.pathname === '/unauthorized' &&
				(!state.auth || !state.auth.role)
			) {
				props.attemptingReAuth = true
			}

			// We can only return a plain object here because it is passed to the browser
			// No circular dependencies
			return props
		}

		handleIframeMessage = e => {
			// we are not going to try and authenticate again (cookie setting)
			if (e.data === 'Skill:NotReAuthing') {
				this.setState({
					attemptingReAuth: false
				})
				return
			}
		}
		async componentDidMount() {
			if (window.self === window.top || window.__SBTEAMMATE__) {
				// make sure we are being loaded inside sb
				console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL')
				this.setState({
					attemptingReAuth: false,
					isIframed: !!window.__SBTEAMMATE__
				})
			} else if (this.props.attemptingReAuth) {
				skill.forceAuth()
			}

			// NOTE: Need to do this require here so that we can be sure the global window is defined
			const WebFont = require('webfontloader') //eslint-disable-line
			WebFont.load({
				google: {
					families: ['Material Icons']
				}
			})

			// setup route changes
			Router &&
				Router.router &&
				Router.router.events.on('routeChangeStart', this.handleRouteChangeStart)

			Router &&
				Router.router &&
				Router.router.events.on(
					'routeChangeComplete',
					this.handleRouteChangeComplete
				)

			// window listeners for reauth communication
			window.addEventListener('message', this.handleIframeMessage)

			// setup event listeners
			skill.addEventListener(
				'did-update-user',
				this.props.actions.events.didUpdateUser
			)

			const bodyClassNames = [
				`${
					is.mobile() ? 'is_mobile' : is.tablet() ? 'is_tablet' : 'is_desktop'
				}`
			]

			if (is.ios()) {
				bodyClassNames.push('is_ios')
			}

			document.body.classList.add(...bodyClassNames)
		}

		componentWillUnmount() {
			// remove all listeners
			window.removeEventListener('message', this.handleIframeMessage)

			// no more user updates
			skill.removeEventListener(
				'did-update-user',
				this.props.actions.events.didUpdateUser
			)

			// remove route changes
			Router &&
				Router.router &&
				Router.router.events.off(
					'routeChangeStart',
					this.handleRouteChangeStart
				)
			Router &&
				Router.router &&
				Router.router.events.off(
					'routeChangeComplete',
					this.handleRouteChangeComplete
				)
		}

		handleRouteChangeComplete = () => {
			if (
				this.props.config.METRICS_ENABLED &&
				this.props.config.METRICS_BROWSER_STATS_ENABLED
			) {
				log.routeChangeComplete()
			}
		}

		handleRouteChangeStart = () => {
			// don't user skill off props, it is pulled server side and lacks all functions
			skill.notifyOfRouteChangeStart()

			if (
				this.props.config.METRICS_ENABLED &&
				this.props.config.METRICS_BROWSER_STATS_ENABLED
			) {
				log.routeChangeStart()
			}
		}

		render() {
			if (this.state.attemptingReAuth) {
				return <Loader />
			}
			if (this.props.config.DEV_MODE) {
				return (
					<Container>
						{this.state.isIframed ? (
							<style jsx global>{`
								html,
								body {
									overflow: hidden;
								}
							`}</style>
						) : null}
						<DevControls auth={this.props.auth} />
						<ConnectedWrapped {...this.props} skill={skill} lang={lang} />
					</Container>
				)
			}
			return (
				<Container>
					{this.state.isIframed ? (
						<style jsx global>{`
							html,
							body {
								overflow: hidden;
							}
						`}</style>
					) : null}
					<ConnectedWrapped {...this.props} skill={skill} lang={lang} />
				</Container>
			)
		}
	}
}

export default Wrapped => Page(Wrapped)
