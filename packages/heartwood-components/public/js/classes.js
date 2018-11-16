const Button = require('./01-button/button.classes')
const ButtonGroup = require('./01-button/button-group.classes')
const ContextMenu = require('./01-button/context-menu.classes')
const Loader = require('./05-feedback/loader.classes')

module.exports = {
	...Button,
	...ButtonGroup,
	...ContextMenu,
	...Loader
}
