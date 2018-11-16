const fs = require('fs-extra')
const icons = require('@sprucelabs/heartwood-components/icons.json')
const { each } = require('lodash')

const lines = []

each(icons, (iconPath, iconName) => {
	lines.push(
		`export ${iconName} from '@sprucelabs/heartwood-components${iconPath}'`
	)
})

fs.outputFile('./src/icons.js', lines.join('\n'))
