// @flow
import React, { Component } from 'react'

import * as actions from '../store/actions'
import ServerCookies from 'cookies'
import ClientCookies from 'js-cookies'
import skill from '../index'
import { Loader, FontLoader } from '@sprucelabs/react-heartwood-components'
import qs from 'qs'
import lang from '../helpers/lang'
import Router, { withRouter } from 'next/router'
import { Container } from 'next/app'
import is from 'is_js'

const debug = require('debug')('@sprucelabs/spruce-next-helpers')

const setCookie = (named, value, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, {
			secure: true,
			httpOnly: false
		})
		return cookies.set(named, value)
	} else {
		return ClientCookies.setItem(named, value)
	}
}

const getCookie = (named, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, {
			secure: true,
			httpOnly: false
		})
		return cookies.get(named)
	} else {
		return ClientCookies.getItem(named)
	}
}

// This is only temporary until theming is set up
const fonts = [
	{
		name: 'Source Sans Pro',
		weight: 400,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
			rel: 'stylesheet'
		}
	},
	{
		name: 'Source Sans Pro',
		weight: 600,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:600',
			rel: 'stylesheet'
		}
	},
	{
		name: 'Source Code Pro',
		weight: 500,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:500',
			rel: 'stylesheet'
		}
	}
]

type Props = {
	pathname: string,
	query: Object,
	asPath: string,
	store: Object,
	res?: Object,
	req?: Object,
	renderLocation?: 'page' | 'modal' | 'right-rail'
}

type State = {
	isIframed: boolean
}

export type WrappedInitialProps = {
	...Props,
	auth?: {
		authing: boolean,
		User?: Object,
		Location?: Object,
		Organization?: Object,
		error?: Object
	}
}

const PageWrapper = Wrapped => {
	const ConnectedWrapped = withRouter(Wrapped)

	return class extends Component<Props, State> {
		constructor(props: Props) {
			super(props)
			this.state = {
				// attemptingReAuth: !!props.attemptingReAuth,
				isIframed: true
			}
		}

		// Everything here is run server side
		static async getInitialProps({
			pathname,
			query,
			asPath,
			store,
			res,
			req,
			renderLocation
		}: Props) {
			let props = {
				pathname,
				query,
				asPath,
				renderLocation: renderLocation || 'page'
			}

			// First get and set the jwt and jwtV2 tokens, preferring the query string version over what's saved in cookies
			let jwt
			if (query.jwt) {
				jwt = query.jwt
				setCookie('jwt', jwt, req, res)
			} else {
				jwt = getCookie('jwt', req, res)
			}

			let jwtV2
			if (query.jwtV2) {
				jwtV2 = query.jwtV2
				setCookie('jwtV2', jwtV2, req, res)
			} else {
				jwtV2 = getCookie('jwtV2', req, res)
			}

			// Do authentication, preferring V2 if the jwtV2 is set
			if (jwtV2) {
				try {
					await store.dispatch(
						actions.authV2.go(query.jwtV2 || getCookie('jwtV2', req, res))
					)
				} catch (e) {
					debug(err)
					debug('Error fetching user from jwt')
				}
			} else if (jwt) {
				try {
					await store.dispatch(actions.auth.go(jwt))
				} catch (err) {
					debug(err)
					debug('Error fetching user from jwtV2')
				}
			}

			const state = store.getState()

			// v1 Legacy authentication logic
			if (state.auth && !state.auth.error && state.auth.version === 1) {
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
				(!state.auth ||
					(state.auth.version === 1 && !state.auth.role) ||
					state.auth.error)
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

				// if we are at '/' then redirect to the corresponding role's path, otherwise just pass it along and let the page handle it
				if (props.pathname === '/') {
					redirect = `/${role}?${queryString}`
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
			// TODO Remove re-auth after proving it works as expected in legacy skill
			// if (
			// 	props.pathname === '/unauthorized' &&
			// 	(!state.auth || !state.auth.role)
			// ) {
			// 	props.attemptingReAuth = true
			// }

			// v2 authentication
			if (state.auth && state.auth.User) {
				debug(
					`AuthLogged in user: ${state.auth.User.id} / ${
						state.auth.User.firstName
					} ${state.auth.User.lastName}`
				)
			}

			// We can only return a plain object here because it is passed to the browser
			// No circular dependencies
			return props
		}

		handleIframeMessage = e => {
			// we are not going to try and authenticate again (cookie setting)
			// if (e.data === 'Skill:NotReAuthing') {
			// 	this.setState({
			// 		attemptingReAuth: false
			// 	})
			// 	return
			// }
		}
		async componentDidMount() {
			if (window.self === window.top || window.__SBTEAMMATE__) {
				// make sure we are being loaded inside sb
				console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL')
				this.setState({
					// attemptingReAuth: false,
					isIframed: !!window.__SBTEAMMATE__
				})
				// } else if (this.props.attemptingReAuth) {
				// skill.forceAuth()
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
			// if (this.state.attemptingReAuth) {
			// return <Loader />
			// }
			if (this.props.config.DEV_MODE) {
				return (
					<Container>
						<FontLoader fonts={fonts} />
						<ConnectedWrapped {...this.props} skill={skill} lang={lang} />
					</Container>
				)
			}
			return (
				<Container>
					<FontLoader fonts={fonts} />
					<ConnectedWrapped {...this.props} skill={skill} lang={lang} />
				</Container>
			)
		}
	}
}

export default Wrapped => PageWrapper(Wrapped)
