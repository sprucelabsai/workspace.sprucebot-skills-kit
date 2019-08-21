const fs = require('fs')
const path = require('path')
const debug = require('debug')('spruce-skill-server')
const Sequelize = require('sequelize')
const Umzug = require('umzug')
const config = require('config')

const defaultModelsDir = path.resolve(__dirname, '../models')

function filterFile(file) {
	const didFilter =
		file.indexOf('.') !== 0 &&
		file !== 'index.js' &&
		/\.(js|ts)$/.test(file) &&
		/\.d\.ts$/.test(file) === false
	if (!didFilter) {
		console.warn(`Filtered file from sequelize import() model %s`, file)
	}
	return didFilter
}

module.exports = (
	{
		runMigrations,
		modelsDir,
		migrationsDir,
		database,
		metricsEnabled,
		metricsSequelizeDisabled,
		options
	},
	key,
	ctx
) => {
	// read all models and import them into the ctx["key"] object
	const sqlOptions = {
		operatorsAliases: false,
		...{ ...options, dialect: database.dialect }
	}

	const databaseUrl =
		process.env.TESTING !== 'true' ? database.url : config.DATABASE_URL_TESTING

	const sequelize = new Sequelize(databaseUrl, sqlOptions)

	// Add sequelize logger
	if (metricsEnabled && !metricsSequelizeDisabled) {
		logger.sequelizeHooks(sequelize)
	} else {
		log.info('Metrics: Sequelize hooks disabled')
	}

	console.log({ defaultModelsDir })

	const coreModels = fs.existsSync(defaultModelsDir)
		? fs
				.readdirSync(defaultModelsDir)
				.filter(filterFile)
				.map(file => path.resolve(defaultModelsDir, file))
		: []

	let skillModels = []
	if (fs.existsSync(modelsDir)) {
		skillModels = fs
			.readdirSync(modelsDir)
			.filter(filterFile)
			.map(file => path.resolve(modelsDir, file))
	}

	// All models available together <3
	const models = coreModels.concat(skillModels).reduce((models, file) => {
		console.log({ file })
		const modelToLoad = require(file)
		console.log({ modelToLoad })
		// Support both TS import and require style
		const model = modelToLoad.default
			? modelToLoad.default(sequelize, Sequelize, ctx)
			: modelToLoad(sequelize, Sequelize, ctx)
		console.log({ model })
		models[model.name] = model

		if (!model.scopes) {
			model.scopes = {
				public: {
					attributes: []
				}
			}
		}
		model.scopeObj = {}
		Object.keys(model.scopes).forEach(scope => {
			model.scopeObj[scope] = {}
			if (model.scopes[scope] && model.scopes[scope].attributes) {
				model.scopes[scope].attributes.forEach(key => {
					model.scopeObj[scope][key] = true
				})
			}
		})

		debug('Imported Skill Model: ', model.name)
		return models
	}, {})

	Object.keys(models).forEach(function(modelName) {
		if (models[modelName].hasOwnProperty('associate')) {
			models[modelName].associate(models)
		}
	})

	// We should only run sync() on the skill db.
	// Core handles it's own migrations
	// So don't run migrations on any model relies on core db
	async function sync() {
		const coreModelNames = coreModels.map(file => path.basename(file, '.js')) // ['User', 'Location', 'UserLocation']
		const filteredModels = []
		Object.keys(models).forEach(key => {
			const model = models[key]
			if (!model.options.doNotSync) {
				debug('Allowing this model to sync()', model.name)
				filteredModels.push(model)
			}
		})

		// Run migrations if enabled
		if (runMigrations && fs.existsSync(migrationsDir)) {
			debug('Running sequelize migrations')
			const umzug = new Umzug({
				storage: 'sequelize',
				storageOptions: {
					sequelize: sequelize
				},
				migrations: {
					params: [sequelize.getQueryInterface(), sequelize.constructor],
					path: migrationsDir,
					pattern: /\.js$/
				}
			})

			// Run Migrations
			await umzug.up()

			debug('Finished sequelize migrations')
		} else {
			console.warn(
				'Could not find any migrations sequelize migrationsDir %s',
				migrationsDir
			)
		}

		// await sequelize.sync({ alter: false, logging: true })
	}

	ctx[key] = { models, sequelize, sync }
	console.log({ key: ctx[key] })
}
