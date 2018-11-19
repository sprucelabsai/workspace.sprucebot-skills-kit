const Button = require('./01-button/button.classes')
const ButtonGroup = require('./01-button/button-group.classes')
const ContextMenu = require('./01-button/context-menu.classes')
const Form = require('./02-forms/form.classes')
const Layout = require('./03-structure/layout.classes')
const Loader = require('./05-feedback/loader.classes')
const Icon = require('./icon.classes')

module.exports = {
	...Button,
	...ButtonGroup,
	...ContextMenu,
	...Form,
	...Layout,
	...Loader,
	...Icon
}
