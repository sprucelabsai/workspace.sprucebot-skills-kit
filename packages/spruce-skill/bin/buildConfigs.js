// Used when building for production. Creates the interface/client.json file from the current config
const config = require('config')
const fs = require('fs')
const clientConfig = config.sanitizeClientConfig({ ...config })
const jsonPath = `${__dirname}/../interface/client.json`
fs.writeFileSync(jsonPath, JSON.stringify(clientConfig))
