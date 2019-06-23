const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
	storybookBaseConfig.node = {
		fs: 'empty'
	}

	// Return the altered config
	return storybookBaseConfig
}
