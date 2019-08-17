const fs = require('fs-extra')
const icons = require('@sprucelabs/heartwood-components/icons.json')
const { each } = require('lodash')

const lines = []

each(icons, (icon, iconName) => {
	lines.push(
		`import ${iconName}_icon from '@sprucelabs/heartwood-components${
			icon.path
		}'`
	)
	lines.push(
		`export const ${iconName} = { icon: ${iconName}_icon, isLineIcon: ${
			icon.isLineIcon
		}}`
	)
})

fs.outputFile('./src/icons.js', lines.join('\n') + '\n')
