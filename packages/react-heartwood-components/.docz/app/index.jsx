import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import '@sprucelabs/heartwood-components/stylesheets/heartwood-components.scss'

const _onPreRenders = []
const _onPostRenders = []

const onPreRender = () => _onPreRenders.forEach(f => f && f())
const onPostRender = () => _onPostRenders.forEach(f => f && f())

const root = document.querySelector('#root')
const render = (Component = Root) => {
	onPreRender()
	ReactDOM.render(<Component />, root, onPostRender)
}

render(Root)
